import { PropsType } from "../types/slideType";
import Image from "next/image";

const Slide: React.FC<PropsType> = ({ image }) => {
  return (
    <div className='w-full h-[300px] md:h-[900px] relative flex flex-wrap'>
      {/* Image container */}
      <div className='w-full h-full relative'> {/* Add relative here */}
        <Image 
          src={image} 
          alt="Description of the image" // Provide a meaningful alt text
          fill // Use fill for responsive images
          style={{ objectFit: 'cover' }} // Optional: to control how the image fits
          unoptimized 
        />
      </div>
    </div>
  );
};

export default Slide;