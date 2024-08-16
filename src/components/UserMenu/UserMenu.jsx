import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css'

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={css.userMenuDescr}>
      <p>Welcome, {user.name} !</p>
      <button className={css.logoutBtn} onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
