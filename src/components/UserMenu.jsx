import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/auth/operations';
import { selectUser } from '../redux/auth/selectors';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
