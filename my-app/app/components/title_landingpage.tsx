interface Title_Types{
    title:string;
    dic:string

}

export default function Title_Landingpage(props:Title_Types) {
  return (
    <>
    
    <div className="text-center mt-32 mb-14 font-semibold text-black  ">
  <div>
  <h2 className="text-xl mb-6 text-center">{props.title}  </h2>
  <h2 className="text-2xl mb-6 text-center">{props.dic}</h2>
  </div>

</div>
    
    
    
    </>
  )
}
