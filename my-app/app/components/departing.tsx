import { fetchProducts, Product } from "@/app/api/search/productRout"; // Updated import
import PageCard from "@/app/components/pagecard";

const DepartingProduct = async () => {
  try {
    // Fetch products from the 'top' category
    const products: Product[] = await fetchProducts();

    if (products.length === 0) {
      // Handle case where no products are found in the 'top' category
      return (
        <div>
          {/* Spacer or Banner */}
          {/* No Products Message */}
          <div className="mt-24 px-4 text-center">
            <p className="text-gray-500 text-lg">No product available at the moment.</p>
          </div>
        </div>
      );
    }

    // Sort products by 'created_at' in descending order (most recent first)
    const sortedProducts = products
      .filter(product => product.created_at) // Ensure 'created_at' exists
      .sort((a, b) => {
        const dateA = new Date(a.created_at!).getTime();
        const dateB = new Date(b.created_at!).getTime();
        return dateB - dateA; // Descending order
      });

    // Limit to the first 8 products
    const limitedProducts = sortedProducts.slice(0, 8);

    return (
      <div>
       

        {/* Product Cards */}
        <div className="mt-24 px-4">
          {/* Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {limitedProducts.map((product) => (
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

export default DepartingProduct;
