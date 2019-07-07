import React, { FC, memo } from 'react';

import { InputProps } from '../../shared/input-props';
import './Input.scss';

const Input: FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="Input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default memo(Input);
