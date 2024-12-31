
import Navbar4 from '../../components/navbar4';
import PageCard from '../../components/pagecard';

export default function OuterWear() {
  // Mock data array
  const products = [
      {
    id: 1,
    image: "/card images/cardimage1.gif",
    oldPrice: "3000",
    discount: "-200.00%",
    price: "90000",
    description: "Test Product 1",
  },
  {
    id: 2,
    image: "/card images/cardimage2.gif",
    oldPrice: "2500",
    discount: "-15.00%",
    price: "2125",
    description: "Test Product 2",
  },
  {
    id: 3,
    image: "/card images/cardimage3.webp",
    oldPrice: "3500",
    discount: "-10.00%",
    price: "3150",
    description: "Test Product 3",
  },
  {
    id: 4,
    image: "/card images/cardimage4.webp",
    oldPrice: "3500",
    discount: "-10.00%",
    price: "3150",
    description: "Test Product 4",
  },
  {
    id: 5,
    image: "/card images/cardimage4.webp",
    oldPrice: "3500",
    discount: "-10.00%",
    price: "3150",
    description: "Test Product 4",
  },
    // Add more products as needed
  ];

  return (
    <>
      {/* Navbar */}
      <div>
        <Navbar4 />
      </div>

      {/* Spacer or Banner */}
      <div className='w-full h-[150px] bg-white'>
        {/* You can add banner content here */}
      </div>

      {/* Page Title */}
      <div className='w-full h-[150px] flex items-center bg-[#f6f4ee]'>
        <p className='text-black p-8 text-2xl font-bold'>
          OuterWears
        </p>
      </div>

      {/* Product Cards */}
      <div className='mt-24 px-4'>
        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {products.map((product) => (
            <PageCard
              key={product.id}
              id={product.id}
              image={product.image}
              oldPrice={product.oldPrice}
              discount={product.discount}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}



