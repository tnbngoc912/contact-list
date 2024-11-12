import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles/ContactForm.module.scss';
import ContactFormItem from './ContactFormItem';
import { Contact, NewContact } from '@/hooks/useContacts';
import Button from '../Button/Button';

interface ContactFormProps {
  initialContact?: NewContact | Contact;
  onSave: (contact: NewContact | Contact) => void;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  initialContact,
  onSave,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialContact,
  });

  const onSubmit = (data: NewContact | Contact) => {
    onSave(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <ContactFormItem
        label="First Name"
        name="first_name"
        type="text"
        register={register}
        errors={errors.first_name}
      />
      <ContactFormItem
        label="Last Name"
        name="last_name"
        type="text"
        register={register}
        errors={errors.last_name}
      />
      <ContactFormItem
        label="Job"
        name="job"
        type="text"
        register={register}
        errors={errors.job}
      />
      <ContactFormItem
        label="Description"
        name="description"
        type="text"
        register={register}
        errors={errors.description}
      />
      <div className={styles.actionsForm}>
        <Button variant="contained" type="submit">
          {initialContact ? 'Save' : 'Add Contact'}
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
