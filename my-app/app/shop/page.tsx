import Productheader from './component/productheader'
import { GetServerSideProps } from 'next';
import {fetchProducts, Product } from '../api/search/productRout';
import PageLayout from '../components/sliderNavebar'
import PageCard from '../components/pagecard'



const ProductPage = async () =>  {
  const products: Product[] = await fetchProducts();

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
};


export default ProductPage;