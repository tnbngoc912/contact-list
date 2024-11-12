import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../Input';

describe('Input Component', () => {
  test('renders input with correct type, value, and placeholder', () => {
    render(
      <Input
        type="email"
        value="test@example.com"
        onChange={() => {}}
        placeholder="Enter your email"
      />
    );

    const inputElement = screen.getByPlaceholderText(/enter your email/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'email');
    expect(inputElement).toHaveValue('test@example.com');
  });

  test('calls onChange handler when value changes', () => {
    const onChangeMock = jest.fn();

    render(
      <Input
        type="text"
        value=""
        onChange={onChangeMock}
        placeholder="Enter your name"
      />
    );

    const inputElement = screen.getByPlaceholderText(/enter your name/i);
    fireEvent.change(inputElement, { target: { value: 'Susan' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test('input is disabled when disabled prop is true', () => {
    render(
      <Input
        type="text"
        value="test"
        onChange={() => {}}
        placeholder="Enter your name"
        disabled={true}
      />
    );

    const inputElement = screen.getByPlaceholderText(/enter your name/i);
    expect(inputElement).toBeDisabled();
  });

  test('does not display error message when error prop is not provided', () => {
    render(
      <Input
        type="text"
        value="test"
        onChange={() => {}}
        placeholder="Enter your name"
      />
    );

    const errorMessage = screen.queryByText(/this field is required/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
