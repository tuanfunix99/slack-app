
import { userActions } from '../reducers/user'

const setUser = (currentUser) => dispatch => {
    return dispatch(userActions.setUser(currentUser))
}

const userAcs = {
    setUser
}

export default userAcs