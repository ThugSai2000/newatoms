import { ActionIcon, Box, Card, SimpleGrid, Space, Text } from '@mantine/core'
import { useFullscreen } from '@mantine/hooks'
import React from 'react'
import { MdFullscreen } from 'react-icons/md'

const TextCard = (props) =>
{
    const { data, screensize } = props
    const { ref, toggle, fullscreen } = useFullscreen();

    return (
        // Text Card component starts here
        <Card padding="lg" shadow="xs" radius="md" ref={ref}>
            {
                <>
                    {/* Title of the text card starts here */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text size="md" className='subcardHeading'>{data.title}</Text>
                        {screensize ? null : <ActionIcon onClick={toggle} ><MdFullscreen size={"2rem"} /></ActionIcon>}
                    </Box>
                    {/* Title of the text card starts here */}

                    {/* <Text size={'1.3rem'} w={600}></Text> */}
                    {/* Content of the textcard starts here */}
                    <SimpleGrid cols={2}>
                        {/* First column keys or names */}
                        <div>
                            {data.ledger.map((key) => (
                                <Text color='var(--color-text)' weight={400} className='detailsCardcol1' >
                                    {key}
                                </Text>
                            ))
                            }
                        </div>
                        {/* second column values  */}
                        <div style={{ marginLeft: '2rem' }}>
                            {data.data[0].value.map((value) => (
                                <Text className='detailsCardcol2' color='var(--color-bold-text)' weight={500} >
                                    <Box style={{ display: 'inline-block' }}>{value}</Box>

                                    <Box ml={4} style={{ display: 'inline-block', color: 'var(--color-text)' }}>{data.labels.units[0]}</Box>

                                </Text>
                            ))
                            }
                        </div>

                    </SimpleGrid>
                    {/* Content of the textcard starts here */}
                </>
            }

        </Card>
        // Text Card component ends here
    )
}

export default TextCard
