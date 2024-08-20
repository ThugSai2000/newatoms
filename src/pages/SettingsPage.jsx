import React from 'react'
import { Box, Container, Title, useMantineColorScheme } from '@mantine/core'
import { MdLightMode, MdDarkMode } from "react-icons/md";
const SettingsPage = () =>
{
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const dark = colorScheme === 'dark'
    return (
        <Container fluid ml={10} mt={"0.3rem"}>
            <Box mt={7}><Title color='var(--color-bold-text)' size={24} fw={500}>Settings</Title></Box>
            {/* <Box>
                <Text>Dark Mode</Text>
                <ActionIcon variant='outline' color={dark ? 'yellow' : 'blue'} onClick={() => toggleColorScheme()}
                    title='Toogle Color Scheme'
                >
                    {dark ? <MdLightMode /> : <MdDarkMode />}
                </ActionIcon>
            </Box> */}

        </Container>
    )
}

export default SettingsPage
