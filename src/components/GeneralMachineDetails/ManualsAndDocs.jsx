import { Box, Card, SimpleGrid, Text } from '@mantine/core'
import React from 'react'
import { BiDownload, BiSolidFileDoc } from 'react-icons/bi'

const ManualsAndDocs = (props) =>
{
    const { value } = props
    return (
        <Card

            shadow="sm"
            padding="xl"
            component="a"
            className='subCard' style={{ height: '17rem' }}
        >
            <Text style={{ marginBottom: '0.5rem' }} className='subcardHeading'>
                Manuals & Docs
            </Text>
            {value.map((cell) =>
                <SimpleGrid cols={3}>
                    <Box mt={23} ml={24} style={{ display: 'flex', flexDirection: 'column' }}>

                        <BiSolidFileDoc size={32} />
                    </Box>

                    <Box mt={16} style={{ display: 'flex', flexDirection: 'column' }}>

                        <Text size={14} w={500}>{cell.Filename}</Text>
                        <label style={{ fontSize: '12px' }} >Owner</label>
                    </Box>
                    {/* <Box style={{ display: 'flex', flexDirection: 'column' }}>

                                            <Text>Created</Text>
                                            <label >Date :</label>
                                        </Box> */}
                    <Box style={{ textAlign: 'center', fontSize: '2rem' }}>

                        <a href={cell.FileUrl} download>
                            <BiDownload />
                        </a>

                    </Box>
                </SimpleGrid>
            )}
        </Card>
    )
}

export default ManualsAndDocs
