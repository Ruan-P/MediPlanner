import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfileData = createAsyncThunk(
    "profile/updateProfile", async (params) => {
        console.log(params)
        let height = Number(params.height)
        let age = Number(params.age)
        let weight = Number(params.weight)
        let userId = params.userID;

        let url = `${process.env.REACT_APP_BACKEND_IP}/api/profile/update`;
        const response = await axios.post(url,{height, age, weight, userId});
        return response.data
})

export const getProfileData = createAsyncThunk(
    "profile/getProfileData", async (userID) => {
        console.log(userID)

        let url = `${process.env.REACT_APP_BACKEND_IP}/api/profile/get`;
        try{
            const response = await axios.post(url, {userID});
            return response.data.items[0];
        } catch (error) {
            return error.response.data;
        }
    }
)

const initialState = {
    update: {
        items: [],
        status: 'idle',
        error: null
    },
    get: {
        items: [],
        status: 'idle',
        error: null
    },
}

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        update: {
            items: [],
            status: 'idle',
            error: null
        }, get: {
            items: [],
            status: 'idle',
            error: null
        }
    },
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfileData.pending, (state, action) => {
                state.update.status = 'loading'
            })
            .addCase(updateProfileData.fulfilled, (state, action) => {
                state.update.status = 'succeeded';
                state.update.items = action.payload;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.update.status = 'failed';
                state.update.error = action.error.message;
            })
    }
})

export const { resetState } = profileSlice.actions;
export default profileSlice.reducer;