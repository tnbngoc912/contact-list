export const initDb = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('ContactsDB', 1);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains('favorites')) {
        db.createObjectStore('favorites', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject('Failed to initialize IndexedDB');
    };
  });
};

export const addFavorite = async (contact: {
  id: number;
  first_name: string;
  last_name: string;
  job: string;
  description: string;
}): Promise<boolean> => {
  const db = await initDb();
  const transaction = db.transaction('favorites', 'readwrite');
  const store = transaction.objectStore('favorites');

  return new Promise((resolve, reject) => {
    const request = store.put(contact);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(false);
  });
};

export const removeFavorite = async (contactId: number) => {
  const db = await initDb();
  const transaction = db.transaction('favorites', 'readwrite');
  const store = transaction.objectStore('favorites');

  return new Promise((resolve, reject) => {
    const request = store.delete(contactId);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(false);
  });
};

export const getAllFavorites = async () => {
  const db = await initDb();
  const transaction = db.transaction('favorites', 'readonly');
  const store = transaction.objectStore('favorites');

  return new Promise<
    {
      id: number;
      first_name: string;
      last_name: string;
      job: string;
      description: string;
    }[]
  >((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to retrieve favorites');
  });
};
