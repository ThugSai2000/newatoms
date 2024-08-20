import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { ActionIcon, Box, Card, Text } from '@mantine/core'
import { MdFullscreen } from 'react-icons/md';
import { useFullscreen } from '@mantine/hooks';

const SeriesLineChart = (props) =>
{
    const { data, screensize } = props


    const [graphData, setGraphData] = useState([])
    const [length, setLength] = useState()
    const { ref, toggle, fullscreen } = useFullscreen();

    console.log(data);

    useEffect(() =>
    {
        const ledgerdata = data.ledger
        const src = [["machine", ...ledgerdata]]

        function seriesData()
        {
            const newSrcData = data.data.map((item) =>
            {

                const yaxis = item.y_axis_data
                const xaxis = item.x_axis_data
                return [xaxis, ...yaxis]
            })
            src.push(...newSrcData)

        }
        seriesData()
        // Handle initial data setup and limiting to 3 elements
        if (data.data.length > 3)
        {
            const limitedData = src.reverse();
            setGraphData(limitedData);
            const toSetMax = parseInt(src[2][2]) + 20
            setLength(toSetMax)

        } else
        {
            const intervalId = setInterval(() =>
            {
                // Simulate new data generation
                const newData = []; // Adjust range as needed
                const newSrcData = data.data.map((item) =>
                {

                    const yaxis = item.y_axis_data
                    const xaxis = item.x_axis_data
                    return [xaxis, ...yaxis]
                })
                newData.push(...newSrcData)

                // Update the graph data with the new data
                setGraphData((prevData) => [...prevData.slice(1), ...newData]); // Shift old data
            }, 4000); // Update interval (adjust as needed)

            // Cleanup function to clear the interval on unmount
            return () => clearInterval(intervalId);
        }


        // Interval to update the chart dynamically

    }, [data.data, data.ledger]);
    // console.log(JSON.stringify(data));

    const DEFAULT_OPTION = {

        // title: {
        //     text: data.title,
        //     textAlign: 'auto',
        //     left: 'center',
        //     textVerticalAlign: 'top',
        //     padding: [30, 0, 0, 0],
        //     textStyle: {
        //         fontSize: 15,
        //     }
        // },
        dataset: {
            source: graphData
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: data.ledger,
            icon: 'rect',
            top: 15
        },
        // toolbox: {
        //     show: true,
        //     feature: {
        //         dataView: { readOnly: false },
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
        grid: {
            top: 50,
            left: 60,
            right: 60,
            bottom: 60
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },

        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    show: false,
                    interval: 0, // Show every other label
                    rotate: 30, // Rotate labels for readability
                },
                name: data.labels.x_label


            }
        ],

        yAxis: [
            {
                type: 'value',
                scale: true,
                showSymbol: false,
                name: data.labels.y_label,
                max: length,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [

            {
                name: data.ledger[0],
                type: 'line',
                showSymbol: true,
                color: '#F35122',

            },
            {
                name: data.ledger[1],
                type: 'line',
                showSymbol: false,
                color: '#0497C0',
            },

        ]
    };
    return (
        <Card padding="lg" shadow="xs" radius="md" ref={ref}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>{data.title}</Text>
                {screensize ? null : <ActionIcon onClick={toggle} ><MdFullscreen size={"2rem"} /></ActionIcon>}

            </Box>
            <ReactECharts
                option={DEFAULT_OPTION}
                style={{ height: 400 }}
            />
        </Card>
    )
}

export default SeriesLineChart
