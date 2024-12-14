

import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { IconType } from "react-icons";


// Define the type for button props
export interface ButtonProps {
  onClick: () => void;
  type: 'wishlist' | 'cart';
  className?: string;
  title?: string;
}

// Button Component
const Button: React.FC<ButtonProps> = (props:ButtonProps) => {
  let Icon: IconType;

  switch(props.type) {
    case 'wishlist':
      Icon = FaRegHeart;
      break;
    case 'cart':
      Icon = IoBagOutline;
      break;
    default:
      Icon = IoBagOutline;
  }

  return (
    <button onClick={props.onClick} className={`button ${props.className}`}>
      <Icon className="text-2xl text-gray-500" />
      {props.title && <span className="ml-2">{props.title}</span>}
    </button>
  );
}

export default Button;
