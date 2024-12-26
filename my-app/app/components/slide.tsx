import { PropsType  } from "@/app/types/slidetype";
import Image from "next/image";

const Slide: React.FC<PropsType> = ({ image }) => {
  return (
    <div className='w-full h-[480px]  relative flex flex-wrap'>
      {/* Image container */}
      <div className="relative h-[480px] w-full">
        <Image 
          src={image}
          alt="Description of the image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Slide;