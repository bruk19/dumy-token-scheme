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
        className={`h-[60px] bg-[#0F0F0F] w-full placeholder:text-[#292929] placeholder:font-Geist placeholder:text-[18px] placeholder:leading-[22.32px] text-primary px-2 ${className}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;