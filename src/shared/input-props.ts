import { ChangeEvent } from 'react';

export interface InputProps<V = string> {
  placeholder: string;
  value: V;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
