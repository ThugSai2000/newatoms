import React, { useEffect, useState } from 'react'
import { Box, Button, Card, SimpleGrid, Text, TextInput } from '@mantine/core'
import { IconDatabase } from '@tabler/icons-react'
import client from '../../API/API'
import { TiTickOutline } from "react-icons/ti";
import { useForm } from '@mantine/form';



const ControlAnalogDataCard = (props) =>
{
    const { data, nodeid } = props

    const [isLoading, setIsLoading] = useState(false);

    // console.log("controls analog : " + JSON.stringify(data))

    // Form for collecting data
    const form = useForm({
        initialValues: {
            val: data.value,
        },

        transformValues: (values) => ({
            val: `${values.val}`
        }),
    })

    // Rest api for updating controls starts here
    const updateData = () =>
    {
        client.put('/machine_control/', {
            machine_id: nodeid,
            name: data.name,
            value: form.getTransformedValues(),
            type: data.type
        }).then((resp) =>
        {
            console.log(resp);
        }).catch((error) =>
        {
            console.log("error", error);
        })


    }
    // Rest api for updating controls ends here


    return (

        // Control analog data card starts here
        <Card className='smallcard' w={'250px'} h={'60px'} shadow="sm" p={0} radius={'6px'} style={{ backgroundColor: 'var(--color-white)', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Box w={'55%'} h={'100%'} ml={10} shadow="sm" radius={'6px'} style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center', }} >
                <Text size={'1rem'} p={'3px'} weight={500} color='var(--color-bold-text)' >{data.name}</Text>
            </Box>
            {/* Form field to display data starts here*/}
            <Box w={'30%'}>
                <TextInput w={60}  {...form.getInputProps('val')} />
            </Box>
            {/* Form field to get data ends here*/}

            {/* Button for updating control  starts here*/}
            <Box w={'25%'} ml={10} mt={1}>
                <Button w={40} p={0} loaderPosition='center' loading={isLoading} onClick={updateData} ><TiTickOutline /></Button>
            </Box>
            {/* Button for updating control ends here*/}
        </Card>
        // Control analog data card ends here
    )
}

export default ControlAnalogDataCard
