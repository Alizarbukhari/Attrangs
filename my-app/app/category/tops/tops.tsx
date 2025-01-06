import { fetchProducts, Product } from "@/app/api/search/productRout";
import PageCard from "@/app/components/pagecard";

const Top = async () => {
  try {
    // Fetch all products from the backend
    const products: Product[] = await fetchProducts();

    // Filter products by category 'top'
    const filteredProducts = products.filter(
      (product: any) => product.category === "top"
    );

    if (filteredProducts.length === 0) {
      // Handle case where no products are found in the 'top' category
      return (
        <div>
          {/* Spacer or Banner */}
          <div className="w-full h-[150px] bg-white"></div>

          {/* Page Title */}
          <div className="w-full h-[150px] flex items-center bg-[#f6f4ee]">
            <p className="text-black p-8 text-2xl font-bold">Tops All Products</p>
          </div>

          {/* No Products Message */}
          <div className="mt-24 px-4 text-center">
            <p className="text-gray-500 text-lg">No tops available at the moment.</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* Spacer or Banner */}
        <div className="w-full h-[150px] bg-white"></div>

        {/* Page Title */}
        <div className="w-full h-[150px] flex items-center bg-[#f6f4ee]">
          <p className="text-black p-8 text-2xl font-bold">Tops All Products</p>
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
  } catch (error) {
    console.error("Error fetching products:", error);

    // Handle fetch error
    return (
      <div>
        {/* Spacer or Banner */}
        <div className="w-full h-[150px] bg-white"></div>

        {/* Page Title */}
        <div className="w-full h-[150px] flex items-center bg-[#f6f4ee]">
          <p className="text-black p-8 text-2xl font-bold">Tops All Products</p>
        </div>

        {/* Error Message */}
        <div className="mt-24 px-4 text-center">
          <p className="text-red-500 text-lg">Failed to load products. Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default Top;
