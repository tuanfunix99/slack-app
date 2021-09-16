
import { createSlice } from '@reduxjs/toolkit'

const messageState = { messages: [] }

const messageSlice = createSlice({
    name: 'channel',
    initialState: messageState,
    reducers: {
        loadMessage: (state, action) => {
            const clone = {...state}
            clone.messages = [...action.payload]
            state = clone
            return state
        },
        addMessage: (state, action) => {
            const clone = {...state}
            clone.messages = [...clone.messages, action.payload]
            state = clone
            return state
        },
    }
})

export const messageActions = messageSlice.actions

export default messageSlice.reducer