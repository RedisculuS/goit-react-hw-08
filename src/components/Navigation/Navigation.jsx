import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css'

const Navigation = () => {
  return (
    <nav className={css.navBar}>
      <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'link')} to="/">Home</NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'link')} to="/contacts">Contacts</NavLink>
    </nav>
  );
};

export default Navigation;
