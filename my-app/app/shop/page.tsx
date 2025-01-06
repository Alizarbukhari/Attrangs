import Productheader from './component/productheader';
import { fetchProducts, Product } from '../api/search/productRout';
import PageLayout from '../components/sliderNavebar';
import PageCard from '../components/pagecard';

const ProductPage = async () => {
  try {
    const products: Product[] = await fetchProducts();

    if (products.length === 0) {
      // Display a message when no products are found
      return (
        <div>
          <PageLayout />
          <div className="w-full h-[150px] bg-white"></div>
          <Productheader />
          <div className="mt-24 px-4 text-center">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <PageLayout />
        <div className="w-full h-[150px] bg-white"></div>
        <Productheader />
        <div className="mt-24 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {products.map((product) => (
              <PageCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);

    // Display an error message in case of a fetch failure
    return (
      <div>
        <PageLayout />
        <div className="w-full h-[150px] bg-white"></div>
        <Productheader />
        <div className="mt-24 px-4 text-center">
          <p className="text-red-500 text-lg">Failed to load products. Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default ProductPage;
