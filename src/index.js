import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from './App'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import db from './utils/firebase'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import thunk from 'redux-thunk'
import allActions from './actions/allActions'
import { useDispatch } from 'react-redux'

const store = createStore(reducer, applyMiddleware(thunk))

const Root = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {  
        db.auth.onAuthStateChanged(user => {
            if(user && user.emailVerified){
                const { uid, displayName, photoURL } = user;
                dispatch(allActions.userAcs.setUser({ uid, displayName, photoURL}))
                dispatch(allActions.channelAcs.loadChannel(uid))
                props.history.push('/')
            }
            else{
                props.history.push('/login')
            }
        })    
    },[])

    return <App/>
}

const RootWithAuth = withRouter(Root)

ReactDOM.render(<Provider store={store}><Router><RootWithAuth/></Router></Provider>, document.getElementById('root'));