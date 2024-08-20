import { ActionIcon, Box, Card, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useFullscreen } from '@mantine/hooks';
import { MdFullscreen } from 'react-icons/md';
const DynamicLineChart = (props) =>
{
    const { data, screensize } = props

    // console.log("Dynamic Line Data" + JSON.stringify(data.data));

    const [graphData, setGraphData] = useState([])
    const [maxLen, setMaxLen] = useState([])
    const { ref, toggle, fullscreen } = useFullscreen();

    useEffect(() =>
    {
        // Handle initial data setup and limiting to 3 elements
        if (data.data.length > 1)
        {
            const limitedData = data.data.slice(0, 50).reverse();
            console.log("first data dynamic line : " + JSON.stringify(limitedData));
            setGraphData(limitedData);
            const max = parseInt(Math.max(...limitedData)) + 20;
            setMaxLen(max)
            // setGraphData(limitedData);
        }
        else
        {
            const intervalId = setInterval(() =>
            {
                // Simulate new data generation
                const newData = data.data; // Adjust range as needed
                setMaxLen(parseInt(newData))
                // Update the graph data with the new data
                setGraphData((prevData) => [...prevData.slice(1), ...newData]); // Shift old data
            }, 4000); // Update interval (adjust as needed)

            // Cleanup function to clear the interval on unmount
            return () => clearInterval(intervalId);
        }


        // Interval to update the chart dynamically

    }, [data]);


    // const data = []

    // const y = ydata.reverse()
    // function makingkeyvaluepairs()
    // {
    //     for (let index = 0; index < 5; index++)
    //     {
    //         const time = xdata[index]
    //         // data.push({ name: xdata[index], value: [time.slice(11, 19), parseInt(ydata[index])] })
    //         data.push(time.slice(11, 19))

    //     }

    // }
    // if (xdata.length > 0)
    // {
    //     makingkeyvaluepairs()
    // }

    // const gdata = data.reverse()
    // const gdata = data.reverse()
    // console.log(gdata)
    const DEFAULT_OPTION = {


        dataset: {
            dimensions: ['x_axis_data', 'y_axis_data'],
            source: graphData
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
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
        visualMap: {
            show: false,
            min: 0,
            max: 1000,
            color: ['#0497C0']
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                name: data.labels.x_label,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false,
                }

            }
        ],

        yAxis: [
            {
                type: 'value',
                // scale: true,
                showSymbol: false,
                name: 'Temparature',
                max: maxLen,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [

            {
                name: data.ledger[0],
                type: 'line',
                showSymbol: false,
                color: '#0497C0',
                areaStyle: {},
                // data: [{ name: "Fri May 05 2000 00:00:00 GMT+0530 (India Standard Time)", value: ['2000/5/5', 5] }, { name: "sat May 06 2000 00:00:00 GMT+0530 (India Standard Time)", value: ['2000/5/6', 8] }, { name: "sun May 07 2000 00:00:00 GMT+0530 (India Standard Time)", value: ['2000/5/7', 6] }]
            }
        ]
    };

    return (
        <Card padding="lg" shadow="xs" radius="md" ref={ref}>


            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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

export default DynamicLineChart
