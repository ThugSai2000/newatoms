import React, { useEffect, useState, } from 'react';

import { useNavigate } from 'react-router-dom';
import
{
    TextInput,
    PasswordInput,
    Paper,
    Container,
    Button,
    Image,

} from '@mantine/core';
import client from '../API/API';
import Logo from "../assets/A_favicon_io/apple-touch-icon.png"
import { FaRegUserCircle } from "react-icons/fa";
import { CiUnlock } from "react-icons/ci";
import { useForm } from '@mantine/form';
import { useRecoilState } from 'recoil';
import { logInStatus } from '../Store/store';



const LoginPage = () =>
{

    const [loader, setLoader] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(logInStatus)


    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: {
            username: (value) => (value === '' ? 'Enter username' : null),
            password: (value) => (value === '' ? 'Enter password' : null),
        },

    })

    const navigate = useNavigate();



    async function handleLogin(values)
    {
        setLoader(true)
        try
        {
            await client.post('/login/', {
                username: values.username,
                password: values.password
            }).then((response) =>  
            {

                if (response.data.status === 'user_validated')
                {

                    console.log("Login : " + JSON.stringify(response.data));
                    // window.localStorage.setItem("Authorization", response.data.generated_token)
                    window.localStorage.setItem("username", response.data.first_name)
                    window.localStorage.setItem("userid", response.data.user_id)
                    window.localStorage.setItem("logourl", response.data.Company_logo)
                    window.localStorage.setItem("pages", JSON.stringify(response.data.pages))
                    setIsLoggedIn(true)


                } else if (response.status !== 200)
                {
                    setLoader(false)
                    // setError(`Got error while connecting with status ${response.status}`)
                }

                else
                {
                    setLoader(false)
                    // setError("Enter correct password or username ")
                    const errormessage = response.data.status === "unauthorized_user" ? "Invalid Credentials" : response.data.error;
                    form.setErrors({
                        username: errormessage,
                        password: errormessage
                    })
                }

            })
        } catch (error)
        {
            console.log(error)
            setLoader(false)
        }

    }

    return (

        isLoggedIn ? navigate('/app/dashboard') : <div>
            <Container size={350} mt={120} id='container_login' color='var(-color-bg)' >
                <Paper withBorder shadow="xl" p={30} radius="md" >
                    <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
                        <Paper display={'grid'} m={'auto'}>
                            <Image src={Logo} width={'6rem'} height={'6rem'} m={'auto'} />
                        </Paper>
                        <TextInput
                            label="Username"
                            placeholder="Enter Username"
                            radius={'1.25rem'}
                            mt={50}
                            icon={<FaRegUserCircle size={'1rem'} />}
                            {...form.getInputProps('username')}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Enter password"
                            mt="md"
                            radius={'1.25rem'}
                            icon={<CiUnlock size={'1rem'} />}
                            {...form.getInputProps('password')}
                        />
                        <Button fullWidth mt="xl" mb={20} type='submit' loading={loader} radius={'1.25rem'}>
                            Login
                        </Button>
                    </form>
                </Paper>
            </Container>

        </div>


    )
}

export default LoginPage
