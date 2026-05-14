// Single import point for the shop UI. Switched to the v2 catalogue, 36
// produkter med utvidet skjema (longDescription, ingredients, howToUse,
// hairTypes, porosity, conditions, imageUrls, rating, reviewCount,
// bestseller, newArrival). De gamle adapter-funksjonene i shop-types.ts
// kalles ikke lenger; v2 leverer alle felter ferdig.

import { realProducts } from "@/lib/shop-products-v2";
import type { ShopProduct } from "@/lib/shop-types";

// v2-radene er strukturelt kompatible med ShopProduct fra shop-types
// (shop-types har et bredere `category`-union). Tildelingen er trygg.
export const shopProducts: ShopProduct[] = realProducts;

export function findProductBySlug(slug: string): ShopProduct | undefined {
  return shopProducts.find((p) => p.slug === slug);
}
