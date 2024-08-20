import { Container, Text } from '@mantine/core'
import React from 'react'

const NoDataAvailable = () =>
{
    return (
        <Container fluid w={'inherit'} h={400} style={{ display: 'grid', placeItems: 'center' }} bg={'white'}>
            <Text color='var(--color-text)' size={20} >No Data Available</Text>
        </Container>
    )
}

export default NoDataAvailable
