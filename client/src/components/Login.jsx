import React, { useState } from "react";
import {
    Box,
    Button,
    Form,
    FormField,
    Grommet,
} from "grommet";
import { hpe } from "grommet-theme-hpe";
import { Redirect } from "react-router-dom";
import axios from 'axios';

function Login(props) {
    // hooks
    const [ toHome, setToHome ] = useState(false);

    //events
    const setData = async (user) => {
        try{
            const { data } = await axios.post(`${props.url}/login`, user);
            setToHome(true)
            props.setUser(data);
        }catch (e){
            props.setError(e);
        }
    }

    const handleOnLogin = async (evt) => {
        evt.preventDefault();

        const user ={
          email: evt.target.form.elements.email.value,
          password: evt.target.form.elements.password.value
        }

        evt.target.form.elements.email.value = '';
        evt.target.form.elements.password.value = '';

        try{
            const { data } = await axios.post(`${props.url}/login`, user);
            setToHome(true)
            props.setUser(data);
        }catch (e){
            props.setError(e);
        }
        // setData(user)
    }

    const redirectHome = toHome ? <Redirect to='/'/> : null;

    return (
        <Grommet theme={hpe}>
        {redirectHome}
            <Box align="center" background="status-ok">
                <p>Login</p>
            </Box>
            <Box pad="medium">
                <Form>
                    <FormField name="email" label="Email Address" placeholder="Your Email Address" />
                    <FormField name="password" type="password" label="Password" placeholder="Your Password" />
                    <Box align="center" pad="medium">
                        <Box direction="row" gap="small">
                            <Button alignSelf="end" onClick={handleOnLogin} primary label="Login" />
                        </Box>
                    </Box>
                </Form>
            </Box>
        </Grommet>
    );
}

export default Login;
