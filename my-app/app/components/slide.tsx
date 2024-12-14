import { PropsType } from "../types/slidetype";
import Image from "next/image";





const Slide: React.FC<PropsType> = ({ image }) => {
  return (
    <div className='w-full  h-[300px] md:h-[900px] relative flex flex-wrap'>
        
      {/* Image container */}
      <div className='w-full h-full'>
        <Image src={image} alt="" height={230.39} width={1349}  className="w-full h-full " />
      </div>
    </div>
  );
};

export default Slide