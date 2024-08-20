import { ActionIcon, Box, Card, Text } from '@mantine/core';
import React from 'react'
import ReactECharts from 'echarts-for-react';
import { formatString, secondsToHms } from '../../utils/reusedfunctions';
import { MdFullscreen } from 'react-icons/md';
import { useFullscreen } from '@mantine/hooks';
const DougnotChart = (props) =>
{
    const { data, screensize } = props

    // convering time to seconds
    const totalTimeInSeconds = 24 * 3600;

    // Filtering out values from data 
    const values = data.data[0].value;

    // ledger names
    const names = data.ledger;
    const { ref, toggle, fullscreen } = useFullscreen();

    // Function for graph data for chart starts here
    const graphdata = [];
    if (data.card === "RunTime")
    {
        for (let i = 0; i < values.length + 1; i++)
        {
            // const a = values[i]  
            // const value = second sToHms(a)
            if (i === 2)
            {
                const val = (totalTimeInSeconds - graphdata[0].value - graphdata[1].value)
                // graphdata.push({ value: totalTimeInSeconds - (parseInt(graphdata[0].value) + parseInt(graphdata[1].value)), name: "Idle Time" });
                graphdata.push({ value: val.toString(), name: "Idle Time" });
                console.log(parseInt(graphdata[0].value));
            }
            else
            {
                graphdata.push({ value: values[i], name: formatString(names[i]) });
            }
        }

    }
    else
    {
        for (let i = 0; i < values.length; i++)
        {
            // const a = values[i]  
            // const value = second sToHms(a)
            graphdata.push({ value: values[i], name: formatString(names[i]) });
        }

    }
    console.log("Douhgnut " + JSON.stringify(graphdata));
    // Function for graph data for chart ends here

    // const graphdata = [
    //     { name: 'Runtime', value: 8 * 3600 }, // Runtime: 8 hours
    //     { name: 'Downtime', value: 4 * 3600 }, // Downtime: 4 hours
    //     { name: 'Idle', value: totalTimeInSeconds - (8 * 3600 + 4 * 3600) }, // Idle time: Remaining hours
    // ];


    const option = {

        tooltip: {
            trigger: 'item',
            formatter: (params) =>
            {
                const value = params.value; // Time in seconds
                const hours = Math.floor(value / 3600);
                const minutes = Math.floor((value % 3600) / 60);
                const seconds = value % 60;

                const formattedTime = `${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`;
                return `${params.seriesName} <br/> Time: ${formattedTime}`;
            },
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: data.data[0].Timestamp,
                type: 'pie',
                radius: ['50%', '35%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 15,
                        fontWeight: 'bold'
                    }
                },
                itemStyle: {
                    borderRadius: 0,
                    borderColor: '#fff',
                    borderWidth: 0
                },
                labelLine: {
                    show: false
                },
                data: graphdata,
                color: [
                    '#66DE93',
                    '#FF616D',
                    // '#D7E4C0',
                    '#D4E2EF'

                    // '#008fb1',
                    // '#00b3cf',
                    // '#006d90',
                    // '#004c6d',
                    // '#00ffff',
                    // '#00d9e9',
                ],
                // data: [
                //     { value: 1048, name: 'Search Engine' },
                //     { value: 735, name: 'Direct' },
                //     { value: 580, name: 'Email' },
                //     { value: 484, name: 'Union Ads' },
                //     { value: 300, name: 'Video Ads' }
                // ]
            }
        ]
    };
    return (
        <Card padding="lg" shadow="xs" radius="md" ref={ref}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>{data.title}</Text>

                {screensize ? null : <ActionIcon onClick={toggle} ><MdFullscreen size={"2rem"} /></ActionIcon>}
            </Box>
            <ReactECharts
                option={option}
                style={{ height: 400 }}
            />
        </Card>
    )
}

export default DougnotChart
