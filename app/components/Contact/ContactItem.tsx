import React, { useCallback, useState } from 'react';
import { Contact, NewContact } from '../../hooks/useContacts';
import Modal from '../Modal/Modal';
import styles from './styles/ContactItem.module.scss';
import StarIcon from '../../../public/icons/star-icon.svg';
import ActiveStarIcon from '../../../public/icons/active-star-icon.svg';
import DeleteIcon from '../../../public/icons/delete-icon.svg';
import EditIcon from '../../../public/icons/edit-icon.svg';
import ContactForm from './ContactForm';
import Button from '../Button/Button';

interface ContactItemProps {
  contact: Contact;
  onDelete: (id: number) => void;
  onEdit: (contact: Contact) => void;
  isFavorite: boolean;
  removeFromFavorites: () => void;
  addToFavorites: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  onEdit,
  onDelete,
  isFavorite,
  removeFromFavorites,
  addToFavorites,
}) => {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const handleConfirmDelete = () => {
    onDelete(contact.id);
  };

  const handleDeleteClick = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  const handleCloseDeleteForm = useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  const handleEditClick = useCallback(() => {
    setShowEditForm(true);
  }, []);

  const handleCloseEditForm = useCallback(() => {
    setShowEditForm(false);
  }, []);

  return (
    <>
      <li className={styles.contactItem}>
        <div className={styles.profileImage}>
          {Array.from(contact.first_name)[0]}
        </div>

        <div className={styles.contactDetails}>
          <h3>
            {contact.first_name} {contact.last_name}
          </h3>
          <p>{contact.job}</p>
          <p>{contact.description}</p>
        </div>

        <div className={styles.actions}>
          <Button
            variant="icon"
            onClick={isFavorite ? removeFromFavorites : addToFavorites}
          >
            {isFavorite ? (
              <ActiveStarIcon alt="star-icon" />
            ) : (
              <StarIcon alt="star-icon" />
            )}
          </Button>

          <Button variant="icon" onClick={handleEditClick}>
            <EditIcon alt="edit-icon" />
          </Button>

          <Button variant="icon" onClick={handleDeleteClick}>
            <DeleteIcon alt="delete-icon" />
          </Button>
        </div>
      </li>

      {showDeleteConfirm && (
        <Modal
          title="Delete contact"
          isOpen={showDeleteConfirm}
          onClose={handleCloseDeleteForm}
        >
          <p>Are you sure you want to delete this contact?</p>
          <div className={styles.btnActionsDelete}>
            <Button
              className={styles.btnConfirmDelete}
              variant="contained"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={handleCloseDeleteForm}>
              Cancel
            </Button>
          </div>
        </Modal>
      )}

      {showEditForm && (
        <Modal
          title="Edit contact"
          isOpen={showEditForm}
          onClose={handleCloseEditForm}
        >
          <ContactForm
            initialContact={contact}
            onSave={(updatedContact: Contact | NewContact) => {
              if ('id' in updatedContact) {
                onEdit(updatedContact as Contact);
              }
              handleCloseEditForm();
            }}
            onClose={handleCloseEditForm}
          />
        </Modal>
      )}
    </>
  );
};

export default ContactItem;
