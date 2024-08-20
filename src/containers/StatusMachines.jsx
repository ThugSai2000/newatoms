import React, { useEffect, useState } from 'react'
import client from '../API/API';
import { Center, Flex, Group, SegmentedControl, Title } from '@mantine/core';
import AccordianComponent from '../components/accordian/AccordianComponent';
import LoaderComponent from '../components/loader/LoaderComponent';
import { fullDate } from '../utils/reusedfunctions';
import { MdFormatListBulleted } from 'react-icons/md'
import { AiFillAppstore } from 'react-icons/ai'
import NoDataAvailable from '../components/noDataAvailable/NoDataAvailable';
import DigitalDataCard from '../components/cards/DigitalDataCard';
import AnalogDataCard from '../components/cards/AnalogDataCard';

const StatusMachines = (props) =>
{
    // props
    const { nodeid, machineid } = props;

    // hooks
    const [timeStamp, setTimestamp] = useState("");
    const [statusData, setStatusData] = useState([])
    const [length, setLenght] = useState(0)
    const [value, setValue] = useState('list')

    // Function for Getting StatusMachines data restApi starts here

    // useEffect(() =>
    // {
    //     if (nodeid !== "")
    //     {
    //         client.get('/Machines_sub_details/', {
    //             withCredentials: true,
    //             params: {
    //                 node_id: nodeid,
    //                 // machine_id: nodeid,
    //                 // module: "iostatus"
    //                 module: "7"
    //             },

    //         }).then(async (response) =>
    //         {

    //             var globalresponse = response.data.iostatus
    //             const dbtime = response.data.iostatus.time_stamp
    //             const stringWithoutQuotes = dbtime.replace(/['"]/g, "");
    //             const stringWithSpace = stringWithoutQuotes.replace(/T/, " ");
    //             const stringWithoutDecimal = stringWithSpace.substring(0, 19);
    //             const stringWithNewDate = stringWithoutDecimal.replace(/2023-10-04/, "04-10-2023");
    //             setTimestamp(stringWithNewDate)

    //             // console.log('Io status : ' + JSON.stringify(extractedData))
    //             const { machine_id, machine_name, time_stamp, node_id, ...rest } = globalresponse
    //             console.log(rest);
    //             setStatusData(rest)

    //         }).catch((error) =>
    //         {
    //             console.log(error);
    //         });
    //     }


    // }, [nodeid]);

    // Function for Getting StatusMachines data restApi ends here

    // Function for Getting StatusMachines data websocket starts here

    useEffect(() =>
    {
        setStatusData([])
        let baseurl = `ws://43.204.19.66:8000/machine_mqtt_data/?machine_id=${machineid}`
        const socket = new WebSocket(baseurl)

        socket.onopen = (event) =>
        {
            console.log("WebSocket connection established:", event)
        }

        socket.onmessage = (event) =>
        {
            const websocketdata = JSON.parse(event.data)
            const data = websocketdata.iostatus
            console.log("io data : " + JSON.stringify(websocketdata))

            const { machine_id, machine_name, Timestamp, node_id, ...rest } = data
            // console.log(rest);

            const length = [...rest.analog_input, ...rest.analog_output, ...rest.digital_input, ...rest.digital_output, ...rest.others]
            // console.log("length of status" + length.length);
            setLenght(length.length)
            setStatusData(rest)
            setTimestamp(Timestamp)
        }
        socket.onclose = (event) =>
        {
            // if (ev) {

            // }
            socket.onopen = (event) =>
            {
                console.log('WebSocket connection established again after closed :', event);

            }
        }
        return () =>
        {
            if (socket)
            {
                console.log('WebSocket connection closed: close event');
                socket.close()

            }
        }


    }, [machineid])

    // Function for Getting StatusMachines data wensocket ends here

    return (

        <div>

            {length > 0 ? <>
                {/* Header starts here */}
                <Group position='apart'>
                    <Title fw={500} fz={16} p={'1rem'} ml={'0rem'} color='var(--color-onclick)'>Last updated at: {fullDate(timeStamp)} </Title>
                    {/* Segment  to display the cards */}
                    <SegmentedControl mr={"1rem"} color="blue"
                        onChange={(value) =>
                        {
                            setValue(value)
                        }}
                        data={[
                            {
                                value: 'list',
                                label: (
                                    <Center>
                                        <MdFormatListBulleted />

                                    </Center>
                                ),
                            },
                            {
                                value: 'expand',
                                label: (
                                    <Center>
                                        <AiFillAppstore />
                                    </Center>
                                ),
                            }
                        ]} />
                </Group>
                {/* Header ends here */}
            </> : <NoDataAvailable />}


            {
                value === 'list' ? (
                    <AccordianComponent data={statusData} />
                ) : (
                    <Flex direction={"column"} gap={"xl"}>
                        {/* Digital Cards Starts  here*/}
                        <Group >
                            {Object.entries(statusData).map(([key, value]) => (
                                (key === "digital_input" || key === "digital_output") && (
                                    value.map((card) => (
                                        <DigitalDataCard key={card.name} data={card} />
                                    ))
                                )
                            ))}
                        </Group>
                        {/* Digital Card Ends Here */}

                        {/* Analog Card Starts Here */}
                        <Group >
                            {Object.entries(statusData).map(([key, value]) => (
                                !(key === "digital_input" || key === "digital_output") && (
                                    value.map((card) => (
                                        <AnalogDataCard key={card.name} data={card} />
                                    ))
                                )
                            ))}
                        </Group>
                        {/* Analog Card Ends Here */}
                    </Flex>
                )
            }

        </div>

    )

}

export default StatusMachines
