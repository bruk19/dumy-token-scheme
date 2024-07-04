// InputField.tsx
import React, { useState } from 'react';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder = 'Amount',
  className = ''
}) => {
  return (
    <div className="relative w-[90%] ">
      <input
        className={`h-[60px] bg-[#0F0F0F] w-full placeholder:text-[#5C5C5C] placeholder:font-Geist placeholder:text-[12px] placeholder:leading-[14.88px] text-primary px-2 ${className}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;