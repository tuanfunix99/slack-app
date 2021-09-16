
import { createSlice } from '@reduxjs/toolkit'

const channelState = { channels: [], currentChannel: {} }

const channelSlice = createSlice({
    name: 'channel',
    initialState: channelState,
    reducers: {
        loadChannel: (state, action) => {
            const clone = {...state}
            clone.channels = [...action.payload]
            if(clone.channels.length > 0){
                clone.currentChannel = clone.channels[0]
            }
            state = clone
            return state
        },
        addChannel: (state, action) => {
            const clone = {...state}
            clone.channels = [...clone.channels, action.payload]
            state = clone
            return state
        },
        setCurrentChannel: (state, action) => {
            const clone = {...state}
            clone.currentChannel = {...action.payload}
            state = clone
            return state
        }
    }
})

export const channelActions = channelSlice.actions

export default channelSlice.reducer