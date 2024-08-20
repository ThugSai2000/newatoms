import React, { useEffect, useState } from 'react'
import client from '../API/API'
import { Container, SimpleGrid, Title } from '@mantine/core'

import ControlAnalogDataCard from '../components/cards/ControlAnalogDataCard'
import ControlDigitalDataCard from '../components/cards/ControlDigitalDataCard'
import { fullDate } from '../utils/reusedfunctions'
import NoDataAvailable from '../components/noDataAvailable/NoDataAvailable'


const ControlMachines = (props) =>
{
    // props starts here
    const { nodeid, machineid } = props
    // props ends here

    const [digitalData, setDigitalData] = useState([])
    // console.log(digitalData)
    const [analogData, setAnalogData] = useState([])
    const [timeStamp, setTimestamp] = useState("");

    // Hook for checking the length of data
    const [length, setLenght] = useState(0)

    // Function for getting controls data starts here both rest api & websocket
    useEffect(() =>
    {
        setLenght(0)

        // rest api

        // if (nodeid !== "")
        // {

        //     // setLoading(true)
        //     client.get('/Machines_sub_details/', {
        //         params: {
        //             node_id: nodeid,
        //             module: '8'
        //         },
        //     }).then(async (response) =>
        //     {
        //         // setIsLoading(false)
        //         const data = response.data.control
        //         const digital = [...data.digital_output, ...data.digital_input]
        //         // console.log("Digital : " + JSON.stringify(digital));
        //         // setCData(response.data.control.digital_output);
        //         setDigitalData(digital)


        //         const analog = [...data.analog_input, ...data.analog_output]
        //         setAnalogData(analog)
        //         ///////////// conteol timestanp
        //         const contime = JSON.stringify(response.data.control.time_stamp)
        //         const stringWithoutQuotes = contime.replace(/['"]/g, "");
        //         const stringWithSpace = stringWithoutQuotes.replace(/T/, " ");
        //         const stringWithoutDecimal = stringWithSpace.substring(0, 19);
        //         const stringWithNewDate = stringWithoutDecimal.replace(/2023-10-04/, "04-10-2023");
        //         setControltime(stringWithNewDate)
        //     });



        // }

        // web socket
        function websocket()
        {
            let url = `ws://43.204.19.66:8000/Control_Socket/?machine_id=${machineid}`

            const socket = new WebSocket(url)

            socket.onopen = (event) =>
            {
                console.log('WebSocket connection established:', event);
            }
            socket.onmessage = (event) =>
            {
                const b = JSON.parse(event.data)
                // console.log("stf : " + JSON.stringify(b))
                // console.log("Web socket started");
                if (b.user_name === window.localStorage.getItem('username'))
                {
                    const data = b.data
                    console.log("Control Machines " + data);
                }
                // console.log("Control Machines " + JSON.stringify(b));
                const data = b.control
                const digital = [...data.digital_output, ...data.digital_input]
                setDigitalData(digital)
                const analog = [...data.analog_input, ...data.analog_output, ...data.others]
                const length = [...digital, ...analog]
                setLenght(length.length)
                setAnalogData(analog)
                setTimestamp(data.Timestamp)

            }
            socket.onclose = () =>
            {
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


        }
        websocket()

    }, [machineid, nodeid])

    // Function for getting controls data starts here both rest api & websocket



    return (

        // Time Stamp of latest data
        length > 0 ? <div> <Title fw={500} fz={16} p={'1rem'} ml={'0rem'} color='var(--color-onclick)'>Last updated at: {fullDate(timeStamp)}</Title>
            {/* Control Machines starts here */}
            <Container fluid bg='var(--color-white)' p={16}>
                <Title fw={500} fz={16} p={'0.5rem'} ml={'0rem'} color='var(--color-bold-text)'>Digital</Title>

                <SimpleGrid cols={4} >

                    {/* Control Digital cards Start here */}
                    {
                        digitalData.map((card) =>
                            card.control !== true ? <ControlDigitalDataCard value={nodeid} data={card} /> : null
                        )
                    }
                    {/* Control Digital cards Start here */}
                </SimpleGrid>


            </Container>

            <Container fluid bg='var(--color-white)' p={16} mt={20}>
                <Title fw={500} fz={16} p={'0.5rem'} ml={'0rem'} color='var(--color-bold-text)'>Analog</Title>
                <SimpleGrid cols={4} >
                    {/* Control Analog cards Starts here */}

                    {
                        analogData.map((card) => (
                            card.control !== true ? <ControlAnalogDataCard value={nodeid} data={card} /> : null
                        ))}

                    {/* Control Analog cards ends here */}

                </SimpleGrid>

            </Container></div>


            : <NoDataAvailable />
        //   Control Machines ends here 


    )
}

export default ControlMachines
