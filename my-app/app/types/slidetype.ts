export type SlideData_Types = {
    id: number;
    image: string;
    title: string;
    maintitle: string;
    price: string;
}
export type NaveItem = {
  name: string;
  href: string;
};
export type NaveType = NaveItem[];


export type PropsType =  {
    image: string;
    title: string;
    maintitle: string;
    price: string;
  }

  export type Nav_Slide_Types =  {
    maintitle: string;
  }

export const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    autoplay: true
  };

  export const settings1 = {
    infinite: true,
    speed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    autoplay: true
  };


  
export type slideImageProps = {
  key?:number ;
  alt:string
  image: string;
  title: string;
}


