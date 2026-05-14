import { notFound } from "next/navigation";
import { findProductBySlug, shopProducts } from "@/lib/shop-catalogue";
import { ProductDetail } from "@/components/shop/ProductDetail";

// Next 15: dynamic route params arrive as a Promise and must be awaited.

export function generateStaticParams() {
  return shopProducts.map((p) => ({ slug: p.slug }));
}

export default async function ShopProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const related = shopProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
