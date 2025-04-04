import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import ProductGrid from "@/components/product/ProductGrid";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/sanity/lib/client";
import React from "react";

type CategoryProps = {
  params: Promise<{ slug: string }>;
};
export default async function CategoryPage({ params }: CategoryProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug),
  ]);
  return (
    <div>
      <SalesCampaignBanner />

      <div className="bg-red-50 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-2">
            {category.title} - UP TO 90% OFF! 🔥
          </h1>
          <p className="text-center text-red-500 text-sm md:text-base animate-pulse">
            ⚡️ Flash Sale Ending Soon! ⏰ Limited Time Only
          </p>
          <p className="text-center text-gray-600 text-xs mt-2">
            {category.description}
          </p>
        </div>
      </div>

      <section className="container mx-auto py-8">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
            🎉 {products.length} Amazing Deals Available Now!
          </p>
        </div>

        <ProductGrid products={products} />
      </section>
    </div>
  );
}
