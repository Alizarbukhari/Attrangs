import { Nav_Slide_Types  } from "../types/slideType";





const Nav_Slide: React.FC<Nav_Slide_Types > = ({ maintitle }) => {
    return (
        <div className='w-full  bg-[#e5aaa3] h-[50px] flex items-center justify-center'>
          {/* Image container */}
          
    
          {/* Text overlay */}
          <div className='  text-white p-4'>
            <h2 className="text-[13px] md:text-[20px] font-bold leading-[1.2]">
              {maintitle}
            </h2>
            <div>
              
            </div>
             
          </div>
        </div>
      );
    };

export default Nav_Slide