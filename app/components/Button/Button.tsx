import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'outlined' | 'contained' | 'text' | 'icon';
  disabled?: boolean;
  className?: string;
  type?: 'reset' | 'submit';
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'contained',
  disabled = false,
  className,
  type,
}) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className || ''}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
