
import Card from "./components/card"
import Header from "./components/header"
import More_Button from "./components/more_button"
import Navbar1 from "./components/navbar1"
import SlideImages from "./components/slideImages"
import Text1 from "./components/text1"
import Title_Landingpage from "./components/title_landingpage"

interface Product {
  id: number;
  image: string;
  oldPrice: string;
  discount: string;
  price: string;
  description: string;
  link?: string;
}

export default function Home() {

  const products: Product[] = [
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
      image: "/card images/cardimage2.gif",
      oldPrice: "2500",
      discount: "-15.00%",
      price: "2125",
      description: "Test Product 2",
    },
    {
      id: 6,
      image: "/card images/cardimage3.webp",
      oldPrice: "2500",
      discount: "-15.00%",
      price: "2125",
      description: "Test Product 2",
    },
    {
      id: 7,
      image: "/card images/cardimage4.webp",
      oldPrice: "2500",
      discount: "-15.00%",
      price: "2125",
      description: "Test Product 2",
    },
    // Add more products as needed
  ];
  
  return (
    <div className="w-full">

<Navbar1/>

<Header/>

<Text1 title ="아뜨랑스는" description="화면너머의 여러분에게 따뜻한 쇼핑메이트이고 싶습니다." brdescription="일상에 스며드는 실용적인 옷들부터" p1="가장 빛이 나야하는 순간까지 언제나 함께 하겠습니다."/>

<SlideImages/>
<Title_Landingpage title="오늘출발.오늘도착.새벽도착🚚" dic="오늘출발"/>

{/* card div start */}
<div className='mt-24 px-4'>
        {/* Grid Layout */}
        <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <Card
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
      {/* card div end */}
<More_Button/>

<Title_Landingpage title="Focus! What you need to pay attention to now" dic="WEEKLY BEST"/>
{/* card2 div start */}
<div className='mt-24 px-4'>
        {/* Grid Layout */}
        <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <Card
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
      {/* card2 div end */}
 <More_Button/>

 <Title_Landingpage title="Hello, new fall products🍁 New product discounts!?" dic="NEW ITEM"/>
{/* card3 div start */}
<div className='mt-24 px-4'>
        {/* Grid Layout */}
        <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <Card
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
      {/* card3 div end */}
 <More_Button/>



    </div>
  )
}
