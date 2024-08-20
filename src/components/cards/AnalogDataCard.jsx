import { Card, Text } from '@mantine/core'
import React from 'react'

const AnalogDataCard = (props) =>
{
    const { data } = props

    return (
        // Analog data card starts here
        <Card w={'215px'} h={'60px'} shadow="sm" p={0} radius={'6px'} style={{ backgroundColor: 'var(--color-white)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left' }}>

            <Text size={'1.1rem'} pl={'1rem'} weight={500} color='var(--color-bold-text)'>{data.name}</Text>


            <Text size={'0.9rem'} pl={'1rem'} fw={500} color='var(--color-text)' >{data.value}</Text>

        </Card>
        // Analog data card ends here
    )
}

export default AnalogDataCard
