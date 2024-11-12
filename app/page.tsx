'use client';
import '../styles/global.scss';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import styles from '../styles/ContactPage.module.scss';
import SortIcon from '../public/icons/sort-icon.svg';
import EmptyList from '../public/images/empty-list.svg';
import NoSearchResult from '../public/images/no-search-result.svg';
import { useFavorites } from '@/hooks/useFavorites';
import useContacts, { NewContact } from './hooks/useContacts';
import Loading from './components/Loading/Loading';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import { Tab, Tabs } from './components/Tabs/Tabs';
import ContactItem from './components/Contact/ContactItem';
import Modal from './components/Modal/Modal';
import ContactForm from './components/Contact/ContactForm';

const Page = () => {
  const {
    contacts,
    loading,
    deleteContact,
    updateContact,
    fetchContacts,
    addContact,
  } = useContacts();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [scrolling, setScrolling] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeKey, setActiveKey] = useState<string>('all');

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    setSearchQuery('');
  }, [activeKey]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredContacts = (activeKey === 'all' ? contacts : favorites).filter(
    (item) => {
      return (
        item.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  );

  const sortedContacts = filteredContacts.sort((a, b) => {
    const firstNameComparison = a.first_name
      .toLowerCase()
      .localeCompare(b.first_name.toLowerCase());

    if (firstNameComparison !== 0) {
      return sortOrder === 'asc' ? firstNameComparison : -firstNameComparison;
    }

    return sortOrder === 'asc'
      ? a.last_name.toLowerCase().localeCompare(b.last_name.toLowerCase())
      : -a.last_name.toLowerCase().localeCompare(b.last_name.toLowerCase());
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const isFavorite = (contactId: number) => {
    return favorites.some((fav) => fav.id === contactId);
  };

  if (loading) return <Loading />;

  const handleRenderList = (type: string) => {
    return sortedContacts.length > 0 ? (
      <>
        <div className={styles.btnSortWrap}>
          <Button
            className={styles.btnSort}
            onClick={toggleSortOrder}
            variant="text"
          >
            <SortIcon stroke="#3559E0" alt="sort-icon" />
            &nbsp;Sort by {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
          </Button>
        </div>
        <ul className={styles.contactListContainer}>
          {sortedContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isFavorite={isFavorite(contact.id)}
              addToFavorites={() => addToFavorites(contact)}
              removeFromFavorites={() => removeFromFavorites(contact.id)}
              onDelete={deleteContact}
              onEdit={updateContact}
            />
          ))}
        </ul>
      </>
    ) : (
      <div>
        {searchQuery ? (
          <>
            <NoSearchResult alt="img-no-search-result" />
            <p>
              No contacts match your search.
              <br />
              Try adjusting your keywords!
            </p>
          </>
        ) : (
          <>
            <EmptyList alt="img-empty-list" />
            <p>
              Your contact {type === 'favorite' && `favorite`} list is empty.
              <br />
              Find and add people to keep in touch.
            </p>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Contact List</title>
        <meta name="description" content="A list of contacts" />
      </Head>

      <div className="container">
        <>
          <header
            className={`${styles.navbar} ${scrolling ? styles.scrolled : ''}`}
          >
            <div className={styles.container}>
              <h2 className={styles.title}>Contact List</h2>
              <div className={`${styles.navElements} ${styles.searchDesktop}`}>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                />
              </div>
              <Button onClick={() => setShowAddForm(true)} variant="contained">
                Add
              </Button>
            </div>
          </header>

          <div className={styles.searchMobile}>
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
          </div>

          <Tabs activeKey={activeKey} setActiveKey={setActiveKey}>
            <Tab eventKey="all" title="Full List">
              {/* ALL LIST */}
              {handleRenderList('all')}
            </Tab>

            <Tab eventKey="favorite" title="Favorite List">
              {/* FAVORITE LIST */}
              {handleRenderList('favorite')}
            </Tab>
          </Tabs>

          {showAddForm && (
            <Modal
              title="Add new contact"
              isOpen={showAddForm}
              onClose={() => setShowAddForm(false)}
            >
              <ContactForm
                onSave={(contact: NewContact) => {
                  addContact(contact);
                  setShowAddForm(false);
                }}
                onClose={() => setShowAddForm(false)}
              />
            </Modal>
          )}
        </>
      </div>
    </>
  );
};

export default Page;
