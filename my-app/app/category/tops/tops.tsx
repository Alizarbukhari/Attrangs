import { fetchProducts, Product } from "@/app/api/search/productRout";
import PageCard from "@/app/components/pagecard";

const Top = async () => {
  // Fetch all products from the backend
  const products: Product[] = await fetchProducts();

  // Filter products by category 'dresses'
  const filteredProducts = products.filter((product:any) => product.category === "top");

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
};

export default Top;


































// import PageCard from '../../components/pagecard';

// export default async function Sweatshirts() {
//   // Mock data array
//   const getProducts = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/products', {
//         cache: 'no-store'
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }
      
//       return response.json();
//     } catch (error) {
//       console.error('Error:', error);
//       return [];
//     }
//   };

//   // Fetch and filter products
//   const allProducts = await getProducts();
//   const filteredProducts = allProducts.filter((product:any) => product.category === 'swearts-hodies');

//   return (
//     <>
//       {/* Spacer or Banner */}
//       <div className='w-full h-[150px] bg-white'>
//         {/* You can add banner content here */}
//       </div>

//       {/* Page Title */}
//       <div className='w-full h-[150px] flex items-center bg-[#f6f4ee]'>
//         <p className='text-black p-8 text-2xl font-bold'>
//         Sweatshirts & Hodies All Products
//         </p>
//       </div>

//       {/* Product Cards */}
//       <div className='mt-24 px-4'>
//         {/* Grid Layout */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
//           {filteredProducts.map((product:any) => (
//             <PageCard
//               key={product.id}
//               id={product.id}
//               image={product.image}
//               oldPrice={product.oldPrice}
//               discount={product.discount}
//               price={product.price}
//               description={product.description}
//               link={product.slug}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }




