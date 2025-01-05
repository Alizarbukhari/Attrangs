import { fetchProducts, Product } from "@/app/api/search/productRout";
import PageCard from "@/app/components/pagecard";

const OuterWear = async () => {
  // Fetch all products from the backend
  const products: Product[] = await fetchProducts();

  // Filter products by category 'dresses'
  const filteredProducts = products.filter((product:any) => product.category === "outerwear");

  return (
    <div>
      {/* Spacer or Banner */}
      <div className="w-full h-[150px] bg-white"></div>

      {/* Page Title */}
      <div className="w-full h-[150px] flex items-center bg-[#f6f4ee]">
        <p className="text-black p-8 text-2xl font-bold">Outerwear All Products</p>
      </div>

      {/* Product Cards */}
      <div className="mt-24 px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {filteredProducts.map((product) => (
            <PageCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OuterWear;
