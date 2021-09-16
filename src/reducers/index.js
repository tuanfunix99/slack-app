
import { combineReducers } from 'redux'
import user from './user'
import channel from './channel'
import message from './message'

const reducer = combineReducers({
    user,
    channel,
    message
})

export default reducer