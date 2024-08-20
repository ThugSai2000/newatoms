import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { ActionIcon, Box, Card, Text } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import { MdFullscreen } from 'react-icons/md';

const DynamicBarChart = (props) =>
{
    const { data, screensize } = props;
    const [graphData, setGraphData] = useState([]);
    const { ref, toggle, fullscreen } = useFullscreen();
    const [length, setLength] = useState()
    useEffect(() =>
    {
        // Handle initial data setup and limiting to 3 elements
        if (data.data.length > 3)
        {
            const limitedData = data.data.slice(0, 36).reverse();
            const filterlength = parseInt(data.data[0].y_axis_data) + 20
            setLength(filterlength)
            setGraphData(limitedData);
        } else if (data.data.length === 0)
        {
            setGraphData(data.data)
        }
        else
        {
            const intervalId = setInterval(() =>
            {
                // Simulate new data generation
                const newData = data.data; // Adjust range as needed
                const filterlength = parseInt(data.data[0].y_axis_data) + 20
                setLength(filterlength)
                // Update the graph data with the new data
                setGraphData((prevData) => [...prevData.slice(1), ...newData]); // Shift old data
            }, 4000); // Update interval (adjust as needed)

            // Cleanup function to clear the interval on unmount
            return () => clearInterval(intervalId);
        }


        // Interval to update the chart dynamically

    }, [data]);

    const DEFAULT_OPTION = {
        // ... your existing DEFAULT_OPTION configuration
        // title: {
        //     text: data.title,
        //     textAlign: 'auto',
        //     left: 'center',
        //     textVerticalAlign: 'top',
        //     padding: [0, 0, 0, 0],
        //     textStyle: {
        //         fontSize: 15,
        //     }
        // },
        legend: {
            data: data.ledger,
            icon: 'rect',
            top: 20
        },
        tooltip: {
            trigger: 'axis',
        },
        dataset: {
            dimensions: ['x_axis_data', 'y_axis_data'],
            source: graphData
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true,
                },
                name: data.labels.x_label,
                min: 0,
                max: 36,
                axisLabel: {
                    show: false,
                    interval: 0, // Show every other label
                    rotate: 30, // Rotate labels for readability
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                showSymbol: false,
                name: data.labels.y_label,
                max: length,
                min: 0,
                boundaryGap: [0.2, 0.2],
            },
        ],
        series: [
            {
                name: data.ledger[0],
                type: 'bar',
                showSymbol: false,
                color: '#F35122',
                barWidth: 5,
                animation: false,
            },
        ],
    };

    return (
        <Card padding="lg" shadow="xs" radius="md" ref={ref}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>{data.title}</Text>
                {screensize ? null : <ActionIcon onClick={toggle} ><MdFullscreen size={"2rem"} /></ActionIcon>}
            </Box>

            <ReactECharts option={DEFAULT_OPTION} style={{ height: 400 }} />
        </Card>
    );
};

export default DynamicBarChart;


// import React, { useEffect, useState } from 'react'
// import ReactECharts from 'echarts-for-react';
// import { Card } from '@mantine/core'

// const BarChart = (props) =>
// {
//     const { data } = props

//     const [graphData, setGraphData] = useState([])
//     const apiData = data.data

//     // function updateData(apidata)
//     // {
//     //
//     // }
//     // setInterval(updateData(apiData), 1000)

//     useEffect(() =>
//     {
//         if (apiData.length > 3)
//         {

//             const limitedData = apiData.slice(0, 3);
//             const reverseData = limitedData.reverse()
//             setGraphData([...graphData, ...reverseData])

//         } else
//         {

//             setGraphData([...graphData, ...apiData])

//         }
//         // setGraphData(apiData)

//     }, [apiData, graphData])



//     const DEFAULT_OPTION = {
//         title: {
//             text: data.title,
//             textAlign: 'auto',
//             left: 'center',
//             textVerticalAlign: 'top',
//             padding: [30, 0, 0, 0]
//         },
//         dataset: {

//             dimensions: ['x_axis_data', 'y_axis_data'],
//             source: graphData
//         },
//         tooltip: {
//             trigger: 'axis',
//             triggerOn: "click"
//         },
//         legend: {
//             data: data.ledger,
//             icon: 'rect',
//             top: 50
//         },
//         // toolbox: {
//         //     show: true,
//         //     feature: {
//         //         dataView: { readOnly: false },
//         //         restore: {},
//         //         saveAsImage: {}
//         //     }
//         // },
//         grid: {
//             top: 100,
//             left: 60,
//             right: 60,
//             bottom: 60
//         },
//         // dataZoom: {
//         //     show: false,
//         //     start: 0,
//         //     end: 100
//         // },

//         xAxis: [
//             {
//                 type: 'category',
//                 axisTick: {
//                     alignWithLabel: true
//                 },
//                 name: data.labels.x_label,
//                 max: 10,
//                 min: 0,
//                 axisLabel: {
//                     interval: 0, // show every other label (adjust as needed)
//                     rotate: 30, // rotate labels for better readability
//                 }

//             }
//         ],

//         yAxis: [
//             {
//                 type: 'value',
//                 scale: true,
//                 showSymbol: false,
//                 name: data.labels.y_label,
//                 max: 2000,
//                 min: 0,
//                 boundaryGap: [0.2, 0.2]
//             }
//         ],
//         series: [

//             {
//                 name: data.ledger[0],
//                 type: 'bar',
//                 showSymbol: false,
//                 color: '#F35122',
//                 barWidth: 15,
//                 animation: false

//             }
//         ]
//     };
//     return (
//         <Card padding="lg" shadow="xs" radius="md">
//             <ReactECharts
//                 option={DEFAULT_OPTION}
//                 style={{ height: 400 }}
//             />
//         </Card>
//     )
// }

// export default BarChart
