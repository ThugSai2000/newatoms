import { Container, Text, Title } from '@mantine/core'
import React from 'react'

const PageNotFound404 = () =>
{
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
            <Title>404</Title>
            <Text>Page Not found</Text>
        </Container>
    )
}

export default PageNotFound404
