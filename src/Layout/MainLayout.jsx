import React, { useState } from 'react'
import './Css/pages.css'
import { ActionIcon, Box, Card, Image, Text, Tooltip, } from '@mantine/core'
import { AppShell, Header } from '@mantine/core';
import NarBarTopComponent from '../components/NavBar/NavBarTopComponent';
import { GiGears, GiHamburgerMenu } from 'react-icons/gi';
import { BiSolidDashboard, BiSolidReport } from 'react-icons/bi';
import { IoMdNotifications } from 'react-icons/io';
import { NavLink, Outlet } from 'react-router-dom';
import AtomsLogo from '../assets/AtomsLogo.png'



const MainLayout
    = () =>
    {


        let [open, setOpen] = useState(false);
        const [showText, setShowText] = useState(false);
        const [largeNavbar, setLargeNavbar] = useState(false);
        // console.log("act " + location.pathname)

        const handleClose = () =>
        {
            setOpen((open) = () => false)

        }

        const toggleTextVisibility = () =>
        {
            setShowText(!showText);
        };

        const toggleNavbarSize = () =>
        {
            setLargeNavbar(!largeNavbar);

        };

        const sidebarItems = [
            { id: 1, link: '/app/dashboard', icon: <BiSolidDashboard size={showText ? '1.5rem' : '1.5rem'} />, label: 'Dashboard' },
            { id: 2, link: '/app/machine', icon: <GiGears size={showText ? '1.5rem' : '1.5rem'} />, label: 'Machine' },
            { id: 3, link: '/app/trail', icon: <IoMdNotifications size={showText ? '1.5rem' : '1.5rem'} />, label: 'Trail' },
            { id: 4, link: '/app/report', icon: <BiSolidReport size={showText ? '1.5rem' : '1.5rem'} />, label: 'Report' },
            // {id:5, link: '/home/settings', icon: <AiFillSetting size={showText ? '1.5rem' : '1.5rem'} />, label: 'Settings' },
        ];
        const newSidebarItems = []
        const items = JSON.parse(window.localStorage.getItem('pages'))
        sidebarItems.map((element, index) =>
        {
            if (items.includes(element.id))
            {
                return newSidebarItems.push(element)
            }

        })
        // console.log(newSidebarItems)


        return (

            <AppShell
                open={open}
                onClose={handleClose}
                padding="md"
                navbar={<div className={`sidebar ${largeNavbar ? 'large-navbar' : ''}`} style={{
                    marginTop: '5rem', width: largeNavbar ? '13rem' : '4.7rem', transition: 'width 0.1s ease-in', background: 'transparent', maxHeight: '90vh', position: 'sticky', zIndex: 20
                }}>

                    {newSidebarItems.map((item, index) => (

                        <NavLink
                            key={item.link}
                            to={item.link}
                            style={{ textDecoration: 'none', color: 'var(--color-text)' }}

                        >
                            <div className="sidebar-item">
                                <Tooltip label={item.label}
                                    disabled={showText}
                                    color="grey"
                                    position="right-start"
                                    withArrow

                                >
                                    <div style={{ color: 'inherit' }}>
                                        {item.icon}
                                    </div>
                                </Tooltip>

                                {showText && <div className="sidebar-text" >
                                    <span>{item.label}</span>

                                </div>}
                            </div>
                        </NavLink>


                    ))}

                    {showText && <Card bg='#F1F3F5' ml={32} sx={{ display: 'grid', placeItems: 'center', position: 'fixed', bottom: '25px', marginBottom: '30px' }} radius={'md'} p={5} pr={10} pl={10}>
                        <Box p={5} >
                            <Text ml={10} size={10} fw={500} color='var(--color-text)'>POWERED BY</Text>
                            <Image src={AtomsLogo} width={'7rem'} />
                        </Box>


                    </Card>}


                </div>
                }
                header={<Header height={60} p="xs" px={0} py={0} m={'0'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', boxShadow: 'rgba(0, 0, 0, 0.45) -6px -15px 9px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.8rem' }}>

                        <ActionIcon color='dark' size={'xl'} radius={'xl'} onClick={() => { toggleTextVisibility(); toggleNavbarSize(); }} style={{ zIndex: '105' }}>
                            <GiHamburgerMenu size={'1.6rem'} color='#373737' />
                        </ActionIcon>
                    </div>
                    <Box >
                        <NarBarTopComponent />

                    </Box>
                </Header>}
                styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
                })}
            >
                <Outlet />
            </AppShell>

        )

    }

export default MainLayout

