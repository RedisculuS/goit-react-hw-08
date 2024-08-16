import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Contact from '../Contact/Contact';
import { fetchContacts } from '../../redux/contacts/operations'; 
import { selectFilteredContacts } from '../../redux/contacts/selectors'; 
import css from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <ul className={css.list}>
      {filteredContacts.map((contact) => (
        <li className={css.item} key={contact.id}>
          <Contact data={contact} />
        </li>
      ))}
    </ul>
  );
}
