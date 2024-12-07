import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (tokenId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_IP}/api/auth/google`, { token: tokenId });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('user');
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: JSON.parse(localStorage.getItem('user')) || null,
        loading: false,
        error: null,
    },
    reducers: {
        loginUser: (state) => {
            state.isAuthenticated = true;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;