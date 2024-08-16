import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <div className={css.authNavBar}>
      <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'link')} to="/register">Register</NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active-link' : 'link')} to="/login">Login</NavLink>
    </div>
  );
};

export default AuthNav;
