import { ActionIcon, Box, Button, Card, ScrollArea } from '@mantine/core'
import React, { useRef, useState } from 'react'
import { Timeline, Text } from '@mantine/core';
import { useEffect } from 'react';
import { fullDate } from '../../utils/reusedfunctions';
import { useFullscreen } from '@mantine/hooks';
import { MdFullscreen } from 'react-icons/md';

const AlarmCard = (props) =>
{
    const { data, screensize } = props
    const [updatedData, setUpdatedData] = useState([])

    // mantine hook for setting card  to full screen
    const { ref, toggle, fullscreen } = useFullscreen();
    const len = data.data

    // const actualData = updatedData.slice(0, 6)

    // Function for adding new data to prev data starts here
    useEffect(() =>
    {
        // const newData = data.data.slice(0, 6)
        // const actualData = newData.reverse()

        setUpdatedData(prevData => [...data.data, ...prevData])



        // }
    }, [data, len])
    // Function for adding new data to prev data ends here


    return (

        <Card padding="lg" shadow="xs" radius="md" ref={ref}>
            {/* Title of the timeline */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text size="md" className='subcardHeading'>{data.title}</Text>
                {screensize ? null : <ActionIcon onClick={toggle} ><MdFullscreen size={"2rem"} /></ActionIcon>}
            </Box>


            {/* time lines starts here */}
            <Timeline active={updatedData.length} bulletSize={10} lineWidth={2} ml={30} p={30}>

                {

                    updatedData.slice(0, 6).reverse().map((message) =>
                    {
                        const time = message.TimeStamp;

                        return <Timeline.Item title={message.Message}>
                            <Text size="xs" mt={4}>{fullDate(time)}</Text>
                        </Timeline.Item>
                    }

                    )
                }


            </Timeline>
            {/* time lines ends here */}


        </Card>
    )
}

export default AlarmCard
