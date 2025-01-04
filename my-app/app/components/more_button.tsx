import Link from "next/link"

export default function More_Button() {
  return (
    <>
    {/* more button */}
<div className="flex justify-center mt-10 mb-6">
  <Link href="/shop">
   <button className="text-xs px-12 py-4" style={{color:'#9e9087',border:'1px solid #9e9087'}}>MORE</button>
   </Link>
</div>
    
    </>
  )
}
