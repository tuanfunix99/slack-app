import React, { useState, useEffect } from 'react';
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon
} from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import db from '../../utils/firebase'
import './Register.css'

const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [isEmailValid, setIsEmailValid] = useState({ error: '', check: false })
    const [isPasswordValid, setPasswordValid] = useState({ error: '', check: false })
    const [isFormValid, setIsFormValid] = useState(true)
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        if (isEmailValid.check && isPasswordValid.check) {
            setIsFormValid(false)
        }
    }, [isPasswordValid, isEmailValid])

    const handleChange = (e) => {
        setUser(pre => {
            return { ...pre, [e.target.name]: e.target.value }
        })
    }

    const onRegisterValid = (e) => {
        switch (e.target.name) {
            case 'email':
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (user.email.trim().length <= 0) {
                    setIsEmailValid({ error: 'Email is required', check: false })
                }
                else if (!re.test(String(user.email).toLowerCase())) {
                    setIsEmailValid({ error: 'Email is not valid', check: false })
                }
                else {
                    setIsEmailValid({ check: true, error: '' })
                }

                break;
            case 'password':
                if (user.password.trim().length <= 0 || user.password.trim().length < 6) {
                    setPasswordValid({ error: 'Password is required and must be at least 6 characters', check: false })
                }
                else {
                    setPasswordValid({ check: true, error: '' })
                }
                break;
            default: return ''
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try{
            await db.auth.signInWithEmailAndPassword(user.email, user.password)
            const currentUser = await db.auth.currentUser;
            if(!currentUser.emailVerified){
                throw new Error('Your account is not verified')
            }
            setLogin(true);
        } catch (error) {
            alert(error.message)
        }
    }

    if(isLogin){
        return <Redirect to="/" />
    }


    return (
        <Grid textAlign="center" verticalAlign="middle" className="app my-3" style={{ marginTop: '50px' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" icon color="violet" textAlign="center">
                    <Icon name="code branch" color="violet" />
                    Login for DevChat
                </Header>
                <Form onSubmit={submitHandler} size="large">
                    <Segment stacked>

                        <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email Address"
                            onChange={handleChange}
                            type="email"
                            onKeyUp={onRegisterValid}
                            className={isEmailValid.error.length > 0 ? 'error' : ''}
                        />

                        {isEmailValid.error.length > 0 && <p className="valid">{isEmailValid.error}</p>}

                        <Form.Input
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            onChange={handleChange}
                            type="password"
                            onKeyUp={onRegisterValid}
                            className={isPasswordValid.error.length > 0 ? 'error' : ''}
                        />
                        {isPasswordValid.error.length > 0 && <p className="valid">{isPasswordValid.error}</p>}

                        <Button disabled={isFormValid} color="violet" fluid size="large">
                            Submit
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    You don't have account? <Link to="/register">Register</Link>
                </Message>
            </Grid.Column>
        </Grid>)
}

export default Login;