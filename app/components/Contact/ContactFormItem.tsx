import React from 'react';
import {
  FieldValues,
  UseFormRegister,
  FieldError,
  Path,
} from 'react-hook-form';
import styles from './styles/ContactFormItem.module.scss';

interface ContactFormItemProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type: string;
  register: UseFormRegister<T>;
  errors: FieldError | undefined;
}

const ContactFormItem = <T extends FieldValues>({
  label,
  name,
  type,
  register,
  errors,
}: ContactFormItemProps<T>) => {
  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <label htmlFor={name}>{label}:</label>
        <input
          id={name}
          type={type}
          {...register(name, { required: `${label} is required` })}
        />
      </div>

      {errors && <p className={styles.errorMessage}>{errors.message}</p>}
    </div>
  );
};

export default ContactFormItem;
