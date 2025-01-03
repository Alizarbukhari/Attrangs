import NavArrowBar from "@/app/components/navarrowbar";
import Navbar4 from "@/app/components/navbar4";
import PageLayout from "@/app/components/sliderNavebar";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Blog_Page_Navigation from "@/app/components/blog_page_navigation";
import Blog_Custom_Model from "@/app/components/blog_custom_model";


const Product_Data =[{
  id:1,
  title:"Chiffon Wrap Aurora Dress",
  slug:"Chiffon-Wrap-Aurora-Dress",
  image_source:"/card images/cardimage1.gif",
  description:"Chiffon Wrap Aurora Dress",
  price:"37.9",


},
{
  id:2,
  title:"Pocket Trim Oversized Long Sleeve Tee",
  slug:"Pocket-Trim-Oversized-Long-Sleeve-Tee",
  image_source:"/card images/cardimage2.gif",
  description:"Chiffon Wrap Aurora Dress",
  price:"47.9",

},
{
  id:3,
  title:"Bodywarm Functional Turtleneck Tee",
  slug:"Bodywarm-Functional-Turtleneck-Tee",
  image_source:"/card images/cardimage3.webp",
  description:"Chiffon Wrap Aurora Dress",
  price:"27.9",

},
{
  id:4,
  title:"Qubeen Pitch Fleece Lined Lettering Trim T-shirt",
  slug:"Qubeen-Pitch-Fleece-Lined-Lettering-Trim-T-shirt",
  image_source:"/card images/cardimage4.webp",
  description:"Chiffon Wrap Aurora Dress",
  price:"33.9",


},
{
  id:5,
  title:"Qubeen Pitch Fleece Lined Lettering Trim T-shirt",
  slug:"Qubeen-Pitch-Fleece-Lined-Lettering-Trim-T-shirt",
  image_source:"/card images/cardimage4.webp",
  description:"Chiffon Wrap Aurora Dress",
  price:"43.9",

}]

export default function Products({ params }: { params: { slug: string } }) {
  const slectBlog = Product_Data.filter((item)=> item.slug === params.slug)
  return (
    // main div
    <div className="w-full h-auto mb-28">
      {/* first content div bg white */}
      <div className="w-full h-[100px]">
      </div>
      {/* first content div */}
      <div className="w-full h-auto px-[20px] flex flex-col md:flex-row flex-wrap gap-4 md:gap-8">
  {/* Image Div */}
  <div className="flex flex-col gap-2">
    {/* Image Div 1 */}
  <div className="w-full md:w-[750px] h-[400px] md:h-[1000px]">
    <Image src={slectBlog[0]?.image_source}
    width={"500"}
    height={"500"}
    alt=""
    className="w-full h-full object-cover"/>
  </div>
  {/* Image Div 2 */}
  <div className="w-[200px] h-[200px]">
  <Image src={slectBlog[0]?.image_source}
    width={"300"}
    height={"300"}
    alt=""
    className="w-full h-full object-cover"/>
  </div>
  </div>

  
  {/* Text Div */}
  <div className="w-full md:w-[750px] h-auto md:h-[1000px]">
    <div className="font-bold text-2xl mt-4 ">{slectBlog[0]?.title}</div>
    <div className="font-bold text-2xl mt-4 ">{slectBlog[0]?.price}</div>
    {/* button div */}
    <div className="flex justify-center cursor-pointer flex-col md:flex-row items-center gap-2 mt-4">
      <div><button className="bg-[#f6f4ee] border border-[#ededed] w-[160px] md:w-[200px] flex items-center h-[50px] justify-center ">button1</button></div>
      <div > <button className=" text-white flex justify-center items-center w-[190px] bg-[#e5aaa3] h-[50px] ">바로 구매하기</button></div>
    </div>
    {/* price div */}
    <div className="flex justify-between px-2 my-4 py-5 border-t border-b border-[#e9e9e9]">
      <div className="text-lg">총 상품금액</div>
      <div className="text-lg font-bold">{slectBlog[0]?.price} 원</div>
    </div>
    {/* line div */}
    <div className="h-[2px] w-full bg-black"></div>
    {/* text and icon */}
    <div className="flex justify-between px-2 my-4 py-5 border-t border-b border-[#e9e9e9]">
    <p className="text-[#333] text-xs md:text-sm font-bold">관리방법</p>
    <p className="text-[#a3a3a3] text-xs md:text-sm">비스코스 (52%) + 폴리, 폴리에스터 (29%) + 나일론 (19%)</p>
      <div><FaChevronRight /></div>
    </div>
    {/* text and icon model div */}
    <div className="w-full border-b border-gray-300 py-2 sm:py-3 md:py-6 px-1 md:px-2 flex justify-between items-center">
    <p className="text-[#333] text-xs sm:text-sm font-bold">모델, 제품 사이즈 정보</p>
      <div><Blog_Custom_Model/></div>
    </div>
    {/* end entrnals */}
  </div>
</div>

{/* buttons div */}
<div>
  <Blog_Page_Navigation/>
</div>


      
    </div>
  )
}
