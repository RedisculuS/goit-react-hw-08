import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      console.log('registration data', credentials);
      const response = await axios.post('/users/signup', credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const logoutUser = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkAPI.rejectWithValue('No token found');
  }

  try {
    const response = await axios.post('/users/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});



export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (token === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


