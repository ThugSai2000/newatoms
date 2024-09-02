import React, { useEffect, useState } from 'react';
import { Card, Container, Group, Indicator, ScrollArea, SimpleGrid, Text, } from '@mantine/core';
import BarChart from '../components/charts/BarChart';
import LoaderComponent from '../components/loader/LoaderComponent';
import { formatString } from '../utils/reusedfunctions';
import SeriesBarChart from '../components/charts/SeriesBarChart';
import DougnotChart from '../components/charts/DougnotChart';
import SeriesLineChart from '../components/charts/SeriesLineChart';
import DynamicLineChart from '../components/charts/DynamicLineChart';
import { Link } from 'react-router-dom';
import { useHover } from '@mantine/hooks';
import '../index.css';

const DashBoardPage = () =>
{
    // State variables to store data
    const [totalCount, setTotalCount] = useState({});
    const [graphData, setGraphData] = useState([]);
    const [machineStatus, setMachineStatus] = useState([]);
    const { hovered, ref } = useHover();
    const pages = window.localStorage.getItem('pages');



    // Establish WebSocket connection and handle messages
    useEffect(() =>
    {
        let url = `ws://192.168.29.144:8000/dashboardSocket/?user_id=${window.localStorage.getItem('userid')}`;
        const socket = new WebSocket(url);

        socket.onopen = (event) =>
        {
            console.log('Websocket Connection established', event);
        };

        socket.onmessage = (event) =>
        {
            const b = JSON.parse(event.data);

            // Filter data based on username
            if (b.user_name === window.localStorage.getItem('username'))
            {
                console.log("Control Machines " + b.data);
            }

            // Update state with received data
            setTotalCount(b.total_count_result);
            setGraphData(b.dashboard_cards.resultant_data);

            // Sort machines into active and inactive lists
            const active = [];
            const inactive = [];
            b.machine_status.forEach((machine) =>
            {
                if (machine.Machines_status === 'Inactive')
                {
                    inactive.push(machine);
                } else
                {
                    active.push(machine);
                }
            });
            setMachineStatus([...active, ...inactive]);
        };

        socket.onclose = () =>
        {
            socket.onopen = (event) =>
            {
                console.log('WebSocket connection established again after closed :', event);
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
    }, []);

    // Render the dashboard component
    return (
        <Container mt={'0.3rem'} fluid>
            <Container fluid ml={10}>
                {/* Conditionally render scroll area based on data availability */}

                {
                    Object.entries(totalCount).length > 0 ? (
                        <>
                            {/* First row with three cards */}
                            <SimpleGrid cols={3} p='sm'>
                                {
                                    Object.entries(totalCount).map(([key, value]) => (
                                        key === "Active Machines" ? (
                                            <Card padding="lg" shadow="xs" radius="md" key={key}>
                                                <Group>
                                                    <Text size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>
                                                        {formatString(key)}
                                                    </Text>
                                                    <Indicator color='green' mt={'-5px'} />
                                                </Group>
                                                <Text color='var(--color-text)' weight={400} className='detailsCardcol1'>{value}</Text>
                                            </Card>
                                        ) : key === "Inactive Machines" ? (
                                            <Card padding="lg" shadow="xs" radius="md" key={key}>
                                                <Group>
                                                    <Text size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>
                                                        {formatString(key)}
                                                    </Text>
                                                    <Indicator color='red' mt={'-5px'} />
                                                </Group>
                                                <Text color='var(--color-text)' weight={400} className='detailsCardcol1'>{value}</Text>
                                            </Card>
                                        ) : (
                                            <Card padding="lg" shadow="xs" radius="md" key={key}>
                                                <Text size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>
                                                    {formatString(key)}
                                                </Text>
                                                <Text color='var(--color-text)' weight={400} className='detailsCardcol1'>{value}</Text>
                                            </Card>
                                        )
                                    ))
                                }
                            </SimpleGrid>

                            {/* Second row with machine status and charts */}
                            <SimpleGrid cols={3} mt='lg' p={'sm'}>
                                <Card padding="lg" shadow="xs" radius="md" >
                                    <ScrollArea style={{ height: 'inherit' }} >
                                        <Text ml={5} size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>Machine Status</Text>
                                        <div>
                                            <SimpleGrid cols={2} pl={20}>
                                                {machineStatus.map((key, value) => (
                                                    pages.includes(2) ? (
                                                        <Group key={value}>
                                                            <Indicator color={key.Machines_status === "Active" ? "green" : "red"} />
                                                            <Text color='var(--color-text)' weight={400} className='detailsCardcol1'>
                                                                <Link id='dashboardlink' to={`/app/submachine/${key.Machine_name}/${key.node_id}/${key.machine_id}`} replace>{formatString(key.Machine_name)}</Link>
                                                            </Text>
                                                        </Group>
                                                    ) : (
                                                        <>
                                                            <Indicator color={key.Machines_status === "Active" ? "green" : "red"} key={value} />
                                                            <Text color='var(--color-text)' weight={400} className='detailsCardcol1' >{formatString(key.Machine_name)}</Text>
                                                        </>
                                                    )
                                                ))}
                                            </SimpleGrid>
                                        </div>
                                    </ScrollArea>
                                </Card>
                                {
                                    graphData.map((card) =>
                                    {
                                        if (card.card === "Bar")
                                        {
                                            const ledger = card.ledger;
                                            return ledger.length > 1 ? <SeriesBarChart data={card} key={card.card} /> : <BarChart data={card} key={card.card} />;
                                        } else if (card.card === "Pie")
                                        {
                                            return <DougnotChart data={card} key={card.card} />;
                                        } else if (card.card === 'Line')
                                        {
                                            const ledger = card.ledger;
                                            return ledger.length > 1 ? <SeriesLineChart data={card} key={card.card} /> : <DynamicLineChart data={card} key={card.card} />;
                                        }
                                    })
                                }
                            </SimpleGrid>
                        </>
                    ) : <LoaderComponent />
                }
            </Container>
        </Container>
    );
};

export default DashBoardPage;
