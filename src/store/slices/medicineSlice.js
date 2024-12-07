import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchMedicine = createAsyncThunk(
    'medicine/search',
    async (params) => {
        console.log(params)
        let it_name, cp_name, userId = params.userID;

        if (Object.keys(params).length === 3) {
            it_name = params.query1;
            cp_name = params.query2;
        } else if (Object.keys(params).length === 2) {
            it_name = params.query1;
        }

        let url = `${process.env.REACT_APP_BACKEND_IP}api/medicine/search`;
        const response = await axios.post(url, { it_name, cp_name, userId });
        return response.data;
    }
);

export const removeMedicine = createAsyncThunk(
    'medicine/remove',
    async (params) => {
        console.log(params);
        let it_name = params.item_name;
        let userId = params.userID;
        let url = `${process.env.REACT_APP_BACKEND_IP}/api/medicine/delete/`;
        const response = await axios.post(url, { it_name, userId });
        return response.data;
    }
)

export const getMedicine = createAsyncThunk(
    'medicine/status',
    async (userID) => {
        console.log(userID)
        let url = `${process.env.REACT_APP_BACKEND_IP}/api/medicine/status/`
        const response = await axios.post(url, {userID});
        console.log(response.data.items)
        return response.data.items;
    }
)

export const saveMedicine = createAsyncThunk(
    'medicine/save',
    async (param) => {

        let url = `${process.env.REACT_APP_BACKEND_IP}/api/medicine/save/`
        const response = await axios.post(url, param);
        return response.data;
})

const initialState = {
    search: {
        items: [],
        status: 'idle',
        error: null,
    }, remove : {
        items: [],
        status: 'idle',
        error: null,
    }, get: {
        items: [],
        status: 'idle',
        error: null,
    }, save: {
        items: [],
        status: 'idle',
        error: null,
    }
}

const medicineSlice = createSlice({
    name: 'medicine',
    initialState: {
        search: {
            items: [],
                status: 'idle',
                error: null
        }, remove: {
            items: [],
            status: 'idle',
            error: null
        },
        get: {
            items: [],
            status: 'idle',
            error: null
        }, save: {
            items: [],
            status: 'idle',
            error: null,
        }
    },
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchMedicine.pending, (state) => {
                state.search.status = 'loading';
            })
            .addCase(searchMedicine.fulfilled, (state, action) => {
                state.search.status = 'succeeded';
                state.search.items = action.payload;
            })
            .addCase(searchMedicine.rejected, (state, action) => {
                state.search.status = 'failed';
                state.search.error = action.error.message;
            })
            .addCase(removeMedicine.pending, (state, action) => {
                state.remove.status = 'loading';
            })
            .addCase(removeMedicine.fulfilled, (state, action) => {
                state.remove.status = 'succeeded';
                state.remove.items = state.remove.items.filter(item => item.id !== action.payload.id);
            })
            .addCase(removeMedicine.rejected, (state, action) => {
                state.remove.status = 'failed';
                state.remove.error = action.error.message;
            })
            .addCase(getMedicine.pending, (state) => {
                state.get.status = 'loading';
            })
            .addCase(getMedicine.fulfilled, (state, action) => {
                state.get.status = 'succeeded';
                state.get.items = action.payload;
            })
            .addCase(getMedicine.rejected, (state, action) => {
                state.get.status = 'failed';
                state.get.error = action.error.message;
            })
    }
});


export const { resetState } = medicineSlice.actions;
export default medicineSlice.reducer;