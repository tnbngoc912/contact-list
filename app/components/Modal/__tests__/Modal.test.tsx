import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';
import '@testing-library/jest-dom';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  test('does not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Modal Title">
        <p>Modal Content</p>
      </Modal>
    );

    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });

  test('calls onClose when clicking the close button', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Modal Title">
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
