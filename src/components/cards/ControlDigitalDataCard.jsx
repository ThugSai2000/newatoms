import { Box, Card, Switch, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import client from '../../API/API';

const ControlDigitalDataCard = (props) =>
{
    const { nodeid, data, onChange, key } = props
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    // const [isSwitchOn, setIsSwitchOn] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    // function for updating swith state
    useEffect(() =>
    {

        setIsSwitchOn(data.value === "On" ? true : false)

    }, [data])

    // Rest api for updating Machine control 

    const handleSwitchChange = (event) =>
    {
        setIsSwitchOn(event.target.checked);

        client.put('/machine_control/', {
            machine_id: nodeid,
            name: data.name,
            value: isSwitchOn ? 'Off' : 'On',
            type: data.type
        }).then(async (response) =>
        {
            if (response === "data has been sent")
            {
                setIsSwitchOn('On')
            }
            // setIsLoading(false);
            console.log(response.data);
        }).catch((error) =>
        {
            // setIsLoading(false);
            console.log(error);
        });


    };


    return (
        //control digital card starts here

        <Card className='smallcard' w={'215px'} h={'60px'} shadow="sm" p={0} radius={'6px'} style={{ backgroundColor: 'var(--color-white)', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} key={key}>
            {/* Test to display data starts here*/}
            <Box w={'65%'} h={'100%'} ml={10} shadow="sm" radius={'6px'} style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center', }} >
                <Text size={'1rem'} p={'3px'} weight={500} color='var(--color-bold-text)' >{data.name}</Text>
            </Box>
            {/* Test to display data ends here*/}


            {/* Button for updating switch state */}
            <Box w={'35%'} h={'100%'} shadow="sm" radius={'6px'}  >

                <Switch checked={isSwitchOn} onChange={handleSwitchChange} mt={18} ml={5} size="md" onLabel="ON" offLabel="OFF" />
            </Box>
        </Card>

        //control digital card ends here
    )
}

export default ControlDigitalDataCard
