import { Card, SimpleGrid, Text } from '@mantine/core'
import React from 'react'
import { formatString } from '../../utils/reusedfunctions'

const GeneralDetails = (props) =>
{
    const { value } = props
    return (
        <Card
            shadow="sm"
            padding="xl"
            component="a"
            className='subCard' style={{ height: '17rem' }}>
            <Text size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>
                Details
            </Text>
            {Object.entries(value).map(([key, value]) =>
                <SimpleGrid cols={2}>
                    <Text color='var(--color-text)' weight={400} className='detailsCardcol1' >
                        {formatString(key)}
                    </Text>
                    <Text className='detailsCardcol2' color='var(--color-bold-text)' weight={500} >
                        {value}
                    </Text>



                </SimpleGrid>
            )}
        </Card>
    )
}

export default GeneralDetails
