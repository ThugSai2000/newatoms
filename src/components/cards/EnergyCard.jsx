import React from 'react'
import { ActionIcon, Box, Card, Paper, Text } from '@mantine/core'
import { useFullscreen } from '@mantine/hooks';
import { MdFullscreen } from 'react-icons/md';


const EnergyCard = (props) =>
{
    const { data, screensize } = props
    const { ref, toggle, fullscreen } = useFullscreen();


    return (
        // Card component starts here
        <Card padding="lg" shadow="xs" radius="md" ref={ref}>
            {
                <>
                    {/* Title component starts here */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text size={'1.3rem'} w={600}>{data.title}</Text>
                        {/* <Text size="md" className='subcardHeading'>{data.title}</Text> */}
                        {screensize ? null : <ActionIcon onClick={toggle} ><MdFullscreen size={"2rem"} /></ActionIcon>}
                    </Box>
                    {/* Title component ends here */}

                    {/* Content componet starts here */}
                    <div style={{ display: 'flex', padding: '1rem' }}>
                        <div>
                            {data.data.keys.map((key) => (
                                <Text p={5}> {key}</Text>
                            ))
                            }
                        </div>
                        <div style={{ marginLeft: '2rem' }}>
                            {data.data.values.map((value) => (
                                <Text p={5}> {value}</Text>
                            ))
                            }
                        </div>

                    </div>
                    {/* Content componet ends here */}

                </>
            }

        </Card>
        // Card component ends here
    )

}

export default EnergyCard
