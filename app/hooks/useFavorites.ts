import { useState, useEffect } from 'react';
import {
  addFavorite,
  removeFavorite,
  getAllFavorites,
} from '@/utils/indexedDbHelper';
import { toast } from 'react-toastify';
import { toastOptions } from '@/utils/toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<
    {
      id: number;
      first_name: string;
      last_name: string;
      job: string;
      description: string;
    }[]
  >([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favContacts = await getAllFavorites();
    setFavorites(favContacts);
  };

  const addToFavorites = async (contact: {
    id: number;
    first_name: string;
    last_name: string;
    job: string;
    description: string;
  }) => {
    try {
      const success = await addFavorite(contact);
      if (success) {
        loadFavorites();
        toast.success('Added to favorites!', toastOptions);
      }
    } catch (error) {
      toast.error('Failed to add to favorites.', toastOptions);
      console.error(error);
    }
  };

  const removeFromFavorites = async (contactId: number) => {
    try {
      const success = await removeFavorite(contactId);
      if (success) {
        loadFavorites();
        toast.success('Removed from favorites!', toastOptions);
      }
    } catch (error) {
      toast.error('Failed to remove from favorites.', toastOptions);
      console.error(error);
    }
  };

  return { favorites, addToFavorites, removeFromFavorites };
};
