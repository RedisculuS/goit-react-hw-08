import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://connections-api.goit.global/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkAPI.rejectWithValue('No token found');
  }

  try {
    const response = await axios.get('/contacts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


export const addContact = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkAPI.rejectWithValue('No token found');
  }

  try {
    const response = await axios.post('/contacts', contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});




export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      await axios.delete(`https://connections-api.goit.global/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return contactId; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
