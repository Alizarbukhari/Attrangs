import Card from "./components/card";
import DepartingProduct from "./components/departing";
import Header from "./components/header";
import More_Button from "./components/more_button";
import Navbar1 from "./components/navbar1";
import SlideImages from "./components/slideImages";
import Text1 from "./components/text1";
import Title_Landingpage from "./components/title_landingpage";
import WeeklyBest from "./components/weeklyBest";

export default function Home() {
  // Add more products as needed

  return (
    <div className="w-full">
      <Navbar1 />

      <Header />

      <Text1
        title="아뜨랑스는"
        description="화면너머의 여러분에게 따뜻한 쇼핑메이트이고 싶습니다."
        brdescription="일상에 스며드는 실용적인 옷들부터"
        p1="가장 빛이 나야하는 순간까지 언제나 함께 하겠습니다."
      />

      <SlideImages />
      <Title_Landingpage title="오늘출발.오늘도착.새벽도착🚚" dic="오늘출발" />

      {/* card div start */}
      <DepartingProduct />
      {/* card div end */}
      <More_Button />

      <Title_Landingpage
        title="Focus! What you need to pay attention to now"
        dic="WEEKLY BEST"
      />
      {/* card2 div start */}
      <WeeklyBest />
      {/* card2 div end */}
      <More_Button />

      <Title_Landingpage
        title="Hello, new fall products🍁 New product discounts!?"
        dic="NEW ITEM"
      />
      {/* card3 div start */}

      <DepartingProduct />
      {/* card3 div end */}
      <More_Button />
    </div>
  );
}
