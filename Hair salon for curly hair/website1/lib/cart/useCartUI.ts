"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny module-scope store for the cart drawer open/close state.
 * Lets Header (open) and AddToBagButton (open after add) and CartDrawer
 * (close) communicate without a Context Provider.
 */

type Listener = () => void;

let open = false;
const listeners = new Set<Listener>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return open;
}

function getServerSnapshot() {
  return false;
}

export function openCart() {
  if (!open) {
    open = true;
    emit();
  }
}

export function closeCart() {
  if (open) {
    open = false;
    emit();
  }
}

export function toggleCart() {
  open = !open;
  emit();
}

export function useCartUI() {
  const isOpen = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { isOpen, open: openCart, close: closeCart, toggle: toggleCart };
}
