import { toastOptions } from '@/utils/toast';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export interface BaseContact {
  first_name: string;
  last_name: string;
  job: string;
  description: string;
}

export interface Contact extends BaseContact {
  id: number;
}

export interface NewContact extends BaseContact {
  id?: number;
}

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
      const data = await response.json();
      setContacts(data.data);
    } catch (error) {
      toast.error('Something went wrong. Please try again.', toastOptions);
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addContact = async (newContact: NewContact) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact: newContact }),
      });
      if (response.ok) {
        toast.success('New contact added!', toastOptions);
        fetchContacts();
      } else {
        toast.error('Failed to add contact. Please try again.', toastOptions);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.', toastOptions);
      console.error('Error adding contact:', error);
    }
  };

  const updateContact = async (updatedContact: Contact) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${updatedContact.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ info: updatedContact }),
        }
      );
      if (response.ok) {
        toast.success('Contact updated!', toastOptions);
        fetchContacts();
      } else {
        toast.error(
          'Failed to update contact. Please try again.',
          toastOptions
        );
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.', toastOptions);
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Contact successfully deleted!', toastOptions);
        fetchContacts();
      } else {
        toast.error(
          'Failed to delete contact. Please try again.',
          toastOptions
        );
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.', toastOptions);
      console.error('Error deleting contact:', error);
    }
  };

  return {
    contacts,
    loading,
    addContact,
    updateContact,
    deleteContact,
    fetchContacts,
  };
};

export default useContacts;
