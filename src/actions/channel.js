
import { channelActions } from '../reducers/channel'
import db from '../utils/firebase'

const loadChannel = (uid) => async dispatch => {
    const res = await db.fStore.collection('channels').get();
    const channels = res.docs.map(doc =>{
        return {...doc.data(), id: doc.id}
    }).filter(channel => channel.createdBy.uid === uid);
    return dispatch(channelActions.loadChannel(channels))
}

const addChannel = (channel) => dispatch => {
    return dispatch(channelActions.addChannel(channel))
}

const setCurrentChannel = (channel) => dispatch => {
    return dispatch(channelActions.setCurrentChannel(channel))
}

const channelAcs = {
    loadChannel,
    addChannel,
    setCurrentChannel
}

export default channelAcs