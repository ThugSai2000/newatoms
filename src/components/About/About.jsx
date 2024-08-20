import React, { useState } from 'react';
import
{
    AppShell,
    Header,
    Footer,
    Text,
    Container,
    Image,
    Box,
    Button,
    SimpleGrid,
    Group,
} from '@mantine/core';
import AutomacScreenmobile from "../../assets/AndroidScreen.png"
import AutomacScreenlaptop from "../../assets/Desktop.png"
import IndiaFlag from "../../assets/flag-for-flag-india-svgrepo-com.svg"
import HeaderLogo from "../../assets/AtomsLogo.png"
import { Link } from 'react-router-dom';
import "./about.css"

export default function About()
{

    return (
        <AppShell

            footer={
                <Footer height={60} p="md" w={'unset'} size={24} fw={500} color='var(--color-bold-text)' sx={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} bg={'var(--color-bg)'}>
                    <Group>
                        <Text ml={30}>Made in India</Text>
                        <Image src={IndiaFlag} width={24} height={20} mt={5} />
                    </Group>
                    <Text mr={30}>Powered by AUTOMAC TECHNOLOGIES</Text>
                </Footer>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md" bg={'var(--color-bg)'}>
                    <div style={{ height: '100%' }}>
                        <SimpleGrid cols={2}>
                            <Image src={HeaderLogo} width={'8rem'} h={'2rem'} sx={{ marginLeft: '50px' }} mt={8} />
                            <Link to={'/login'}>
                                <Button w={100} ml={600}>
                                    Login
                                </Button>
                            </Link>
                        </SimpleGrid>
                    </div>
                </Header>
            }
        >
            <main >
                <Container fluid >
                    <div style={{ display: 'grid', placeItems: 'center', padding: '24px', width: '70%', marginLeft: '15%', marginTop: '20px' }}>
                        <h1 style={{ fontWeight: '700', fontSize: '30px' }}>
                            FUTURE OF <Text display={'inline-block'} color='red'>MANUFACTURING</Text> IS HERE.
                        </h1>
                        <Text size={20} align='center' mt={"2.25rem"}>The revolutionary IoT platform from Automac Technologies that empowers you to see the unseen and control the future of your machines.</Text>
                    </div>
                    <div class="smartphone">
                        <div class="content">
                            <Image src={AutomacScreenmobile} h={400} />
                        </div>
                    </div>
                    <div class="laptop">
                        <div class="content" >
                            <Image src={AutomacScreenlaptop} />
                        </div>
                    </div>

                </Container>


                <Container fluid w={'100%'} h={'100%'} style={{ display: "grid", placeItems: 'center', zIndex: 20, }} mt={0}>
                    <Box>
                        {/* <Link to={'/login'}> */}
                        <Button w={200} zIndex={10}>
                            Contact Us
                        </Button>
                        <br />
                        {/* </Link> */}
                    </Box>


                </Container>


            </main>

        </AppShell>
    );
}