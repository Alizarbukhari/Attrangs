
import Card from "./components/card"
import Header from "./components/header"
import Navbar1 from "./components/navbar1"
import SlideImages from "./components/slideImages"
import Text1 from "./components/text1"

export default function Home() {
  return (
    <div className="w-full">

<Navbar1/>
 {/* <Navbar2/> */}
<Header/>

<Text1 title ="아뜨랑스는" description="화면너머의 여러분에게 따뜻한 쇼핑메이트이고 싶습니다." brdescription="일상에 스며드는 실용적인 옷들부터" p1="가장 빛이 나야하는 순간까지 언제나 함께 하겠습니다."/>

<SlideImages/>
<div className="text-center mt-32 mb-14 font-semibold text-black  ">
  <div>
  <h2 className="text-sm mb-6 text-center"> 오늘출발.오늘도착.새벽도착🚚 </h2>
  <h2 className="text-2xl mb-6 text-center">오늘출발</h2>
  </div>

</div>

<Card/>




    </div>
  )
}
