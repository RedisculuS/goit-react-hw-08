import './App.css';
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = lazy(()=> import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(()=>import('./pages/RegistrationPage/RegistrationPage'));
const ContactsPage = lazy(()=>import('./pages/ContactsPage/ContactsPage'));

import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing, selectIsLoggedIn } from './redux/auth/selectors';

function App() {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if(isRefreshing) {
    return <div>Loading...</div>
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="register"
          element={<RestrictedRoute redirectTo='/' component={RegistrationPage} />}
        />
        <Route
          path="login"
          element={<RestrictedRoute redirectTo='/' component={LoginPage} />}
        />
        <Route
          path="contacts"
          element={<PrivateRoute redirectTo='/contacts' component={ContactsPage} />}
        />
      </Route>
    </Routes>
    </Suspense>
    
  );
}

export default App;
