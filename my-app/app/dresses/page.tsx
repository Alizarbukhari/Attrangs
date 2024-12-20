
import Card from '../components/card'
import Navbar4 from '../components/navbar4'

export default function Dresses() {
  return (
    <>
   <div>
    <Navbar4 />
   
   </div>
   <div className='w-full h-[150px] bg-white'>
      
    </div>
    <div className='w-full h-[150px] flex items-center bg-[#f6f4ee]'>
      <p className='text-black p-8 text-2xl font-bold '>
        Dresses All Products
      </p>
    </div>
    <div className='mt-24'>
      <Card/>
    </div>
   </>
  )
}
