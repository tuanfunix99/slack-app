
import { createSlice } from '@reduxjs/toolkit'

const userState = {currentUser: null}

const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setUser: (state, action) => {
            const clone = {...state}
            clone.currentUser = action.payload
            state = clone
            return state
        },

    }
})

export const userActions = userSlice.actions

export default userSlice.reducer