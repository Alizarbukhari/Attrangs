import Productheader from './component/productheader'

import PageLayout from '../components/sliderNavebar'
import PageCard from '../components/pagecard'

async function Product() {
  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/products', {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  const products = await getProducts();

  return (
    <div>
      <PageLayout/>
      <div className='w-full h-[150px] bg-white'>
      </div>
      <Productheader/>
      <div className='mt-24 px-4'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {products.map((product: any) => (
            <PageCard
              key={product.id}
              id={product.id}
              image={product.image}
              oldPrice={product.oldPrice}
              discount={product.discount}
              price={product.price}
              description={product.description}
              link={product.link}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Product 