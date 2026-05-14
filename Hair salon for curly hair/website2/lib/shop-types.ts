// Expanded shop product schema used by the shop UI.
// This file owns the canonical ShopProduct shape and a runtime adapter that
// promotes the legacy RealProduct rows in lib/shop-products.ts to the
// expanded shape. When a future subagent ships shop-products-v2 with the
// full 36-product catalogue and the wider fields, the orchestrator can swap
// the import in lib/shop-catalogue.ts without changing any UI code.

import type { RealProduct, ShopStock } from "@/lib/shop-products";

export type ShopCategory =
  | "shampoo"
  | "conditioner"
  | "leave-in"
  | "deep-treatment"
  | "styler"
  | "oil"
  | "tool"
  | "accessory"
  // Legacy category retained for the current 15-product dataset.
  | "treatment";

export type ShopPorosity = "low" | "medium" | "high";

export type ShopProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  /** Price in NOK, integer. */
  price: number;
  category: ShopCategory;
  /** Andre Walker curl pattern tags, e.g. ["3B", "4A"]. */
  hairTypes: string[];
  porosity: ShopPorosity[];
  conditions: string[];
  stock: ShopStock;
  description: { en: string; no: string };
  longDescription: { en: string; no: string };
  ingredients?: string;
  howToUse?: { en: string; no: string };
  imageUrls: string[];
  externalCheckoutUrl: string;
  stylistPick?: { en: string; no: string };
  rating: number;
  reviewCount: number;
  bestseller?: boolean;
  newArrival?: boolean;
};

/**
 * Promote a legacy RealProduct row to a ShopProduct, filling in defaults for
 * fields that the v1 dataset never carried. The UI treats every product as a
 * full ShopProduct, so any narrower record must be widened at the boundary.
 */
export function toShopProduct(row: RealProduct): ShopProduct {
  return {
    id: row.id,
    slug: row.id,
    name: row.name,
    brand: row.brand,
    price: row.price,
    category: row.category as ShopCategory,
    hairTypes: row.curlTypes,
    porosity: [],
    conditions: [],
    stock: row.stock,
    description: row.description,
    longDescription: row.description,
    imageUrls: [row.imageUrl],
    externalCheckoutUrl: row.externalCheckoutUrl,
    stylistPick: row.stylistPick,
    rating: 4.5,
    reviewCount: 0,
  };
}

export function toShopProducts(rows: RealProduct[]): ShopProduct[] {
  return rows.map(toShopProduct);
}
