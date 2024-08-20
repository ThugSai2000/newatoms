import { Box, Card, Text } from '@mantine/core'
import React from 'react'

const DigitalDataCard = (props) =>
{
    const { data } = props

    return (
        <Card w={'215px'} h={'60px'} shadow="sm" p={0} radius={'6px'} style={{ backgroundColor: 'var(--color-white)', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            {/* io names  */}
            <Box w={'75%'} h={'100%'} shadow="sm" radius={'6px'} style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                <Text size={'1rem'} p={'3px'} weight={500} align='center' color='var(--color-bold-text)'>{data.name}</Text>
            </Box>
            {/* io values */}
            <Box w={'25%'} h={'100%'} shadow="sm" radius={'6px'} bg={data.color}>
                <Text size={'1rem'} mt={14} weight={400} color='var(--color-white)' align='center' >{data.value}</Text>
            </Box>
        </Card>
    )
}

export default DigitalDataCard
