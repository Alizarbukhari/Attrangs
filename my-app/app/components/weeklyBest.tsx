import { fetchProducts, Product } from "@/app/api/search/productRout"; // Updated import
import PageCard from "@/app/components/pagecard";

const WeeklyBest = async () => {
  try {
    // Fetch products
    const products: Product[] = await fetchProducts();

    if (products.length === 0) {
      // Handle case where no products are found
      return (
        <div>
          {/* No Products Message */}
          <div className="mt-24 px-4 text-center">
            <p className="text-gray-500 text-lg">No weekly best product available at the moment.</p>
          </div>
        </div>
      );
    }

    // Filter products with higher order_quantity
    const filteredProducts = products.filter(product => product.order_quantity && product.order_quantity > 0);

    if (filteredProducts.length === 0) {
      return (
        <div>
          {/* No High Order Quantity Products Message */}
          <div className="mt-24 px-4 text-center">
            <p className="text-gray-500 text-lg">No product with high order quantity available at the moment.</p>
          </div>
        </div>
      );
    }

    // Sort filtered products by 'created_at' in descending order
    const sortedProducts = filteredProducts
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
        {/* Error Message */}
        <div className="mt-24 px-4 text-center">
          <p className="text-red-500 text-lg">Failed to load products. Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default WeeklyBest;
