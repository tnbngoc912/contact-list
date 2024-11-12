import React from 'react';
import styles from './Input.module.scss';

type InputProps = {
  type?: 'text' | 'password' | 'email' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  disabled = false,
  id,
  name,
  className,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.input} ${className}`}
      />
    </div>
  );
};

export default Input;
