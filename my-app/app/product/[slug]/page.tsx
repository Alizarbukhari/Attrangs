import NavArrowBar from "@/app/components/navarrowbar";
import Navbar4 from "@/app/components/navbar4";
import PageLayout from "@/app/components/sliderNavebar";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Blog_Page_Navigation from "@/app/components/blog_page_navigation";
import Blog_Custom_Model from "@/app/components/blog_custom_model";

export default function Products() {
  return (
    // main div
    <div className="w-full h-auto mb-28">
      {/* first content div bg white */}
      <div className="w-full h-[100px] bg-red-50">
      </div>
      {/* first content div */}
      <div className="w-full h-auto px-[20px] flex flex-col md:flex-row flex-wrap gap-4 md:gap-8">
  {/* Image Div */}
  <div className="flex flex-col gap-2">
    {/* Image Div 1 */}
  <div className="w-full md:w-[750px] h-[400px] md:h-[1000px] bg-green-400">
    <Image src={""}
    width={"0"}
    height={"0"}
    alt=""/>
  </div>
  {/* Image Div 2 */}
  <div className="w-[200px] h-[200px] bg-orange-300"></div>
  </div>

  
  {/* Text Div */}
  <div className="w-full md:w-[750px] h-auto md:h-[1000px]">
    <div className="font-bold text-2xl mt-4 ">Soft Moisturizing Banding Knit Pants</div>
    <div className="font-bold text-2xl mt-4 ">37.9</div>
    {/* button div */}
    <div className="flex justify-center cursor-pointer flex-col md:flex-row items-center gap-2 mt-4">
      <div><button className="bg-[#f6f4ee] border border-[#ededed] w-[160px] md:w-[200px] flex items-center h-[50px] justify-center ">button1</button></div>
      <div > <button className=" text-white flex justify-center items-center w-[190px] bg-[#e5aaa3] h-[50px] ">바로 구매하기</button></div>
    </div>
    {/* price div */}
    <div className="flex justify-between px-2 my-4 py-5 border-t border-b border-[#e9e9e9]">
      <div className="text-lg">총 상품금액</div>
      <div className="text-lg font-bold">37.9 원</div>
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
