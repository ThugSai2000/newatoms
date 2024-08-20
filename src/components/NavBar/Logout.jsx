import React, { useEffect, useState } from 'react'
import { Avatar, Menu, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import "./CSS/navbarTop.css"
import client from '../../API/API';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { logInStatus } from '../../Store/store';
import Cookies from 'js-cookie'


const Logout = () =>
{

    const navigate = useNavigate()
    const [logout, setLogout] = useState(false)

    const handleLogout = () =>
    {

        client.get('http://atomssol.in/backend/logout', {
            withCredentials: true,
            // headers: {
            //     Authorization: window.localStorage.getItem('Authorization')
            // }
        }).then((response) =>
        {
            if (response.data.status === "Logged_out")
            {

                localStorage.clear()

                // Example usage in a button click handler
                window.location.reload()
                navigate('/login')

                // logOutStatus(false)


            }
        })

    };
    useEffect(() =>
    {
        if (logout)
        {
            window.location.reload('/login')
        }

    }, [logout])
    return (
        // <Container >
        <Menu withArrow arrowPosition='center' position='bottom-end'>
            <Menu.Target>
                <Avatar color="var(--color-icon)" radius="xl"><Text size={20} >{window.localStorage.getItem('username').charAt(0).toLocaleUpperCase()}</Text></Avatar>
            </Menu.Target>
            <Menu.Dropdown sx={{ marginTop: '1.2rem' }} >
                <Menu.Item sx={{ fontSize: '16px' }} pr={60} fw={500} color='var(--color-bold-text)'>{window.localStorage.getItem('username').charAt(0).toLocaleUpperCase() + window.localStorage.getItem('username').slice(1)}</Menu.Item>
                {/* <Menu.Label>Role</Menu.Label> */}
                <Menu.Divider />
                {/* <Menu.Item sx={{ fontSize: '16px' }} fw={500} color='var(--color-text)'><Link to={'/settings'} style={{ textDecoration: 'none', color: 'var(--color-text)' }}>Account Settings</Link> </Menu.Item> */}
                <Menu.Item fw={500} color='rgba(211, 40, 40, 1)' sx={{ fontSize: '16px' }} onClick={handleLogout}>Logout</Menu.Item>
            </Menu.Dropdown>
        </Menu>


        // </Container>
    )
}

export default Logout
