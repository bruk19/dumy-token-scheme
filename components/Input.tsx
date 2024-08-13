import React, { useState } from 'react';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  resetPlaceholder?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder = 'Amount',
  className = '',
  resetPlaceholder= false
}) => {
  const [shouldResetPlaceholder, setShouldResetPlaceholder] = useState(resetPlaceholder);

  const handleAmountChange = (newValue: string) => {
    onChange(newValue);
    setShouldResetPlaceholder(false);
  };

  return (
    <div className="relative w-[90%] z-9">
      <input
        className={`h-[60px] w-full bg-[#0F0F0F] placeholder:text-[#5C5C5C] placeholder:font-Geist placeholder:text-[12px] placeholder:leading-[14.88px] text-primary px-2 ${className}`}
        type="text"
        placeholder={shouldResetPlaceholder ? 'Amount' : placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;