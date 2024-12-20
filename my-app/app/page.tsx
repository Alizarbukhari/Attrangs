
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

<Text1/>
<SlideImages/>
<Text1/>
<Card/>



    </div>
  )
}
