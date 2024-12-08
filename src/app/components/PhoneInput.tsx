import React from 'react';
import InputMask from '@mona-health/react-input-mask';

interface PhoneInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  return (
    <InputMask
      mask="+503 9999-9999"
      value={value}
      onChange={onChange}
    >
      {(inputProps) => <input {...inputProps} type="text" />}
    </InputMask>
  );
};

export default PhoneInput;
