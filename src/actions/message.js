
import { messageActions } from '../reducers/message'
import db from '../utils/firebase'

const loadMessage = (id) => async dispatch => {
    const res = await db.fStore.collection('messages').get()
    const messages = res.docs.map(doc =>{
        return {...doc.data(), id: doc.id}
    }).filter(message => message.channelId === id)
    .sort((message, message1) => message.createdAt.seconds - message1.createdAt.seconds)
    return dispatch(messageActions.loadMessage(messages))
}

const addMessage = (message) => dispatch => {
    return dispatch(messageActions.addMessage(message))
}


const messageAcs = {
    loadMessage,
    addMessage,
}

export default messageAcs