import React, { Suspense, useEffect, useState } from 'react'
import { user } from '../Store/store';
import client from '../API/API';
import { Box, Group, SimpleGrid, Space, Text, Title } from '@mantine/core';
import ProductionDifferenceCard from '../components/cards/ProductionDifferenceCard';
import EnergyCard from '../components/cards/EnergyCard';
import LoaderComponent from '../components/loader/LoaderComponent';
import BarChart from '../components/charts/BarChart';
import DougnotChart from '../components/charts/DougnotChart';
import TextCard from '../components/cards/TextCard';
import SeriesBarChart from '../components/charts/SeriesBarChart';
import NoDataAvailable from '../components/noDataAvailable/NoDataAvailable';
import SeriesLineChart from '../components/charts/SeriesLineChart';
import DynamicBarChart from '../components/charts/DynamicBarChart';
import DynamicLineChart from '../components/charts/DynamicLineChart';
import { fullDate } from '../utils/reusedfunctions';
import AlarmCard from '../components/cards/AlarmCard';

const KpiMachines = (props) =>
{
    // props
    const { nodeid, machineid, screensize } = props

    // hooks
    const [kpidata, setKpidata] = useState([])
    const [status, setStatus] = useState()
    const [timestamp, setTimestamp] = useState("")

    // Funtion for getting KPI data websocket and rest api starts here
    useEffect(() =>
    {
        setKpidata([])
        // if (nodeid !== "")
        // {
        //     client.get('/Machines_sub_details/', {
        //         withCredentials: true,
        //         params: {
        //             node_id: nodeid,
        //             // machine_id: nodeid,
        //             module: "6"
        //         },

        //     }).then((response) =>
        //     {
        //         const kpidata = response.data.resultant_data
        //         console.log("kpi data : " + JSON.stringify(kpidata))
        //         setKpidata(kpidata)
        //         // console.log("rest started");
        //         // console.log('kpis ' + JSON.stringify(kpidata))

        //     }).catch((error) =>
        //     {
        //         console.log(error);
        //     });
        // }

        let baseurl = `ws://192.168.29.144:8000/kpi_web_socket/?machine_id=${machineid}`

        const socket = new WebSocket(baseurl);
        socket.onopen = (event) =>
        {
            console.log('WebSocket connection established:', event);
            // setSocket(socket);
        };
        socket.onmessage = (event) =>
        {
            const b = JSON.parse(event.data)
            const data = b.resultant_data
            setKpidata(data);

            data.map((card) =>
            {
                if (card.card === "Status")
                {
                    setStatus(card)
                }
            })
            setTimestamp(b.Timestamp)
            // console.log("On message : " + JSON.stringify(event.isTrusted))

            // console.log("stf : " + JSON.stringify(event))

            // console.log("Web socket started");
            // if (b.user_name === window.localStorage.getItem('username'))
            // {

            // }

            // console.log("Kpi Machines : " + JSON.stringify(b));
        };
        socket.onclose = () =>
        {
            socket.onopen = (event) =>
            {

                console.log('WebSocket connection established again after closed :', event);
                // setSocket(socket);
            };
        };
        return () =>
        {
            if (socket)
            {
                console.log('WebSocket connection closed: close event');
                socket.close();
            }
        };

    }, [machineid, nodeid])
    // Funtion for getting KPI data websocket and rest api ends here

    // Function for dividing no of coloums in UI based on lenght starts here
    const length = kpidata.length
    let col
    function cols(noOfCols)
    {
        if (noOfCols === 1)
        {
            col = 1
        }
        else if (noOfCols >= 3)
        {
            col = 3
        }
        else if (noOfCols === 2)
        {
            col = 2
        }
        return col
    }
    // Function for dividing no of coloums in UI based on lenght ends here

    // console.log("cols : " + col);
    return (

        // kpi component starts here 
        <div>
            {
                kpidata.length > 0 ?
                    <div>
                        {/* KPI header shows last updated time stamp starts here */}
                        <Group p={'1rem'} pt={0} ml={'0rem'} position='apart'>
                            <Title fw={500} fz={16} color='var(--color-onclick)'>Last updated at: {fullDate(timestamp)}
                            </Title>
                            {kpidata.map((status) => status.card === "Status" ? <Box fw={400} fz={12} style={{ display: 'flex' }}><Text size={'md'} color='var(--color-text)' weight={500} className='detailsCardcol1' >{status.title} :</Text><span>&nbsp;</span> <Text size={'md'} className='detailsCardcol2' color='var(--color-bold-text)' weight={500}>{status.data[0].Machine}</Text>
                            </Box> : null)}
                            {/* <Box fw={400} fz={12} style={{ display: 'flex' }}><Text size={'md'} color='var(--color-text)' weight={500} className='detailsCardcol1' >{status.title} :</Text><span>&nbsp;</span> <Text size={'md'} className='detailsCardcol2' color='var(--color-bold-text)' weight={500}>{status.data[0].Machine}</Text>
                    </Box> */}
                        </Group>
                        {/* KPI header shows last updated time stamp ends here */}

                        {/* Container of cards starts here for KPI  */}
                        <SimpleGrid cols={col = cols(length)}>
                            {

                                // Function for rendering Cards in UI starts here
                                kpidata.map((card) =>
                                {


                                    if (card.card === 'Bar')
                                    {
                                        const ledger = card.ledger

                                        if (ledger.length > 1)
                                        {
                                            // SeriesBarChart Component
                                            return <SeriesBarChart data={card} screensize={screensize} />
                                        } else
                                        {
                                            // DynamicBarChart Component
                                            return <DynamicBarChart data={card} screensize={screensize} />
                                        }
                                    }
                                    if (card.card === 'Energy_Card')
                                    {
                                        // EnergyCard Component
                                        return <EnergyCard data={card} screensize={screensize} />
                                    }
                                    if (card.card === 'Line')
                                    {
                                        const ledger = card.ledger

                                        if (ledger.length > 1)
                                        {
                                            // SeriesLineChart Component
                                            return <SeriesLineChart data={card} screensize={screensize} />
                                        } else
                                        {
                                            // DynamicLineChart Component
                                            return <DynamicLineChart data={card} screensize={screensize} />
                                        }
                                    }
                                    if (card.card === 'Pie')
                                    {
                                        // DougnotChart Component
                                        return <DougnotChart data={card} screensize={screensize} />
                                    }
                                    if (card.card === 'RunTime')
                                    {
                                        // DougnotChart Component
                                        return <DougnotChart data={card} screensize={screensize} />
                                    }
                                    if (card.card === 'Text')
                                    {
                                        // TextCard Component
                                        return <TextCard data={card} screensize={screensize} />
                                    }
                                    if (card.card === 'Alarm')
                                    {
                                        // AlarmCard Component
                                        return <AlarmCard data={card} screensize={screensize} />
                                    }


                                })
                                // Function for rendering Cards in UI ends here
                            }

                        </SimpleGrid>
                        {/* Container of cards starts here for KPI  */}
                    </div> : <NoDataAvailable />
            }
        </div>
        // kpi component ends here


    )
}

export default KpiMachines
