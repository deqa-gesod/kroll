import { notFound } from "next/navigation";
import { realProducts } from "@/lib/content/shop-products-v2";
import { ProductDetail } from "@/components/shop/ProductDetail";

export function generateStaticParams() {
  return realProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = realProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
