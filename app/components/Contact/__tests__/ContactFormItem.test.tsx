import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FieldError, useForm } from 'react-hook-form';
import ContactFormItem from '../ContactFormItem';

const TestForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  return (
    <form onSubmit={handleSubmit(() => {})}>
      <ContactFormItem
        label="First Name"
        name="first_name"
        type="text"
        register={register}
        errors={errors.first_name as FieldError}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe('ContactFormItem', () => {
  it('should render the input field with the correct label', () => {
    render(<TestForm />);

    const label = screen.getByLabelText(/First Name:/i);
    expect(label).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should show an error message if the input is left empty', async () => {
    render(<TestForm />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('First Name is required')).toBeInTheDocument();
    });
  });

  it('should not show an error message when input is filled in correctly', async () => {
    render(<TestForm />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Susan' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(
        screen.queryByText('First Name is required')
      ).not.toBeInTheDocument();
    });
  });
});
