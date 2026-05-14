"use client";

import { useEffect, useSyncExternalStore } from "react";

/**
 * Mock cart state for the shop prototype.
 * State is held in module scope and persisted to sessionStorage so
 * SiteShell, AddToBagButton, and CartDrawer can share a single source
 * of truth without wiring a Context Provider.
 */

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  /** Price in NOK, integer. */
  price: number;
  imageUrl: string;
  externalCheckoutUrl: string;
  qty: number;
};

const STORAGE_KEY = "jc-cart";

type Listener = () => void;

let items: CartItem[] = [];
let hydrated = false;
const listeners = new Set<Listener>();

function isBrowser() {
  return typeof window !== "undefined";
}

function emit() {
  for (const l of listeners) l();
}

function persist() {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore storage errors (private mode, quota)
  }
}

function hydrate() {
  if (hydrated || !isBrowser()) return;
  hydrated = true;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return;
    const safe: CartItem[] = [];
    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const e = entry as Record<string, unknown>;
      if (
        typeof e.id === "string" &&
        typeof e.name === "string" &&
        typeof e.brand === "string" &&
        typeof e.price === "number" &&
        typeof e.imageUrl === "string" &&
        typeof e.externalCheckoutUrl === "string" &&
        typeof e.qty === "number"
      ) {
        safe.push({
          id: e.id,
          name: e.name,
          brand: e.brand,
          price: e.price,
          imageUrl: e.imageUrl,
          externalCheckoutUrl: e.externalCheckoutUrl,
          qty: Math.max(1, Math.floor(e.qty)),
        });
      }
    }
    items = safe;
  } catch {
    items = [];
  }
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): CartItem[] {
  return items;
}

const EMPTY: CartItem[] = [];

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function add(item: Omit<CartItem, "qty">) {
  const existing = items.find((i) => i.id === item.id);
  if (existing) {
    items = items.map((i) =>
      i.id === item.id ? { ...i, qty: i.qty + 1 } : i
    );
  } else {
    items = [...items, { ...item, qty: 1 }];
  }
  persist();
  emit();
}

function remove(id: string) {
  items = items.filter((i) => i.id !== id);
  persist();
  emit();
}

function setQty(id: string, qty: number) {
  const clamped = Math.max(1, Math.floor(qty));
  items = items.map((i) => (i.id === id ? { ...i, qty: clamped } : i));
  persist();
  emit();
}

function clear() {
  items = [];
  persist();
  emit();
}

type UseCartReturn = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

export function useCart(): UseCartReturn {
  useEffect(() => {
    if (!hydrated) {
      hydrate();
      emit();
    }
  }, []);

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const count = snapshot.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = snapshot.reduce((sum, i) => sum + i.qty * i.price, 0);

  return {
    items: snapshot,
    count,
    subtotal,
    add,
    remove,
    setQty,
    clear,
  };
}
