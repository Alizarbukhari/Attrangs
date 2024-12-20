// conditional.tsx
import React from 'react';

interface ConditionalProps {
  onAgreeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Conditional: React.FC<ConditionalProps> = ({ onAgreeChange }) => {
  return (
    <div className="w-[90%] mx-auto my-4 text-[14px] flex items-center gap-2 font-[500]">
      <input 
        id="agr" 
        className="mr-2" 
        type="radio" 
        name="term" 
        value="agree" 
        onChange={onAgreeChange} 
      />
      <label htmlFor="agr">I agree</label>

      <input 
        id="dis" 
        className="mr-2" 
        type="radio" 
        name="term" 
        value="disagree" 
        onChange={onAgreeChange} 
      />
      <label htmlFor="dis">Disagree</label>
    </div>
  )
}

export default Conditional;
