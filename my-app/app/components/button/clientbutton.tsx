'use client'; 

import React from 'react';
import Button from '../button/button'; 

interface ClientButtonProps {
  type: 'wishlist' | 'cart';
  onClick: () => void;
  title?: string;
}

const ClientButton: React.FC<ClientButtonProps> = ({ type, onClick, title }) => {
  return (
    <Button type={type} onClick={onClick} title={title} />
  );
}

export default ClientButton;
