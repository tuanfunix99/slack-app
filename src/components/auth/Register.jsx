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
import md5 from 'md5'


const Register = () => {

    const [register, setRegister] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    const [isUsernameValid, setIsUsernameValid] = useState({ error: '', check: false })
    const [isEmailValid, setIsEmailValid] = useState({ error: '', check: false })
    const [isPasswordValid, setPasswordValid] = useState({ error: '', check: false })
    const [isPasswordConfirmValid, setPasswordConfirmValid] = useState({ error: '', check: false })
    const [isFormValid, setIsFormValid] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isEmailValid.check && isPasswordConfirmValid.check && isPasswordValid.check && isUsernameValid.check) {
            setIsFormValid(false)
        }
    }, [isUsernameValid, isPasswordValid, isPasswordConfirmValid, isEmailValid])

    const handleChange = (e) => {
        setRegister(pre => {
            return { ...pre, [e.target.name]: e.target.value }
        })
    }

    const onRegisterValid = (e) => {
        switch (e.target.name) {
            case 'username':
                if (register.username.trim().length <= 0) {
                    setIsUsernameValid({ error: 'Username is required', check: false })
                }
                else {
                    setIsUsernameValid({ check: true, error: '' })
                }

                break;
            case 'email':
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (register.email.trim().length <= 0) {
                    setIsEmailValid({ error: 'Email is required', check: false })
                }
                else if (!re.test(String(register.email).toLowerCase())) {
                    setIsEmailValid({ error: 'Email is not valid', check: false })
                }
                else {
                    setIsEmailValid({ check: true, error: '' })
                }

                break;
            case 'password':
                if (register.password.trim().length <= 0 || register.password.trim().length < 6) {
                    setPasswordValid({ error: 'Password is required and must be at least 6 characters', check: false })
                }
                else {
                    setPasswordValid({ check: true, error: '' })
                }
                break;
            case 'passwordConfirmation':
                if (register.password.trim().length <= 0 || register.password.trim().length < 6) {
                    setPasswordConfirmValid({ error: 'Password is required and must be at least 6 characters', check: false })
                }
                else if (register.passwordConfirmation !== register.password) {
                    setPasswordConfirmValid({ error: 'Password confirm not match', check: false })
                }
                else {
                    setPasswordConfirmValid({ check: true, error: '' })
                }
                break;
            default: return ''
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await db.auth.createUserWithEmailAndPassword(register.email, register.password);
            const currentUser = await db.auth.currentUser;
            if (currentUser) {
                try {
                    await currentUser.sendEmailVerification()
                    await currentUser.updateProfile({
                        displayName: register.username,
                        photoURL: `http://gravatar.com/avatar/${md5(currentUser.email)}?d=identicon`
                    })
                    await db.fStore.collection('users').add({
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    })
                    alert('We send a link to your email, please check and verify it.')
                    setIsSuccess(true)
                } catch (error) {
                    alert(error.message)
                }
            }
            else {

            }
        } catch (error) {
            alert(error.message)
        }
    }

    if(isSuccess){
        return <Redirect to="/login" />
    }

    return (
        <Grid textAlign="center" verticalAlign="middle" className="app" style={{ marginTop: '50px' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" icon color="orange" textAlign="center">
                    <Icon name="puzzle piece" color="orange" />
                    Register for DevChat
                </Header>
                <Form onSubmit={submitHandler} size="large">
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name="username"
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            onChange={handleChange}
                            type="text"
                            onKeyUp={onRegisterValid}
                            className={isUsernameValid.error.length > 0 ? 'error' : ''}
                        />

                        {isUsernameValid.error.length > 0 && <p className="valid">{isUsernameValid.error}</p>}

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

                        <Form.Input
                            fluid
                            name="passwordConfirmation"
                            icon="repeat"
                            iconPosition="left"
                            placeholder="Password Confirmation"
                            onChange={handleChange}
                            type="password"
                            onKeyUp={onRegisterValid}
                            className={isPasswordConfirmValid.error.length > 0 ? 'error' : ''}
                        />
                        {isPasswordConfirmValid.error.length > 0 && <p className="valid">{isPasswordConfirmValid.error}</p>}

                        <Button disabled={isFormValid} color="orange" fluid size="large">
                            Submit
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already a user? <Link to="/login">Login</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Register;