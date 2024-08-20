import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { ActionIcon, Box, Card, Text } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import { MdFullscreen } from 'react-icons/md';

// Simple barchart
const BarChart = (props) =>
{
    const { data, screensize } = props;
    const [graphData, setGraphData] = useState([]);
    const { ref, toggle, fullscreen } = useFullscreen();

    // Function for data manupulating adding new data to previous data starts here
    useEffect(() =>
    {
        // Handle initial data setup and limiting to 3 elements
        if (data.data.length > 3)
        {
            const limitedData = data.data.slice(0, 120).reverse();
            setGraphData(limitedData);
        } else
        {
            const intervalId = setInterval(() =>
            {
                // Simulate new data generation
                const newData = data.data; // Adjust range as needed

                // Update the graph data with the new data
                setGraphData((prevData) => [...prevData.slice(1), ...newData]); // Shift old data
            }, 4000); // Update interval (adjust as needed)

            // Cleanup function to clear the interval on unmount
            return () => clearInterval(intervalId);
        }


        // Interval to update the chart dynamically

    }, [data]);
    // Function for data manupulating adding new data to previous data ends here

    // Function for chart options starts here
    const DEFAULT_OPTION = {
        // ... your existing DEFAULT_OPTION configuration
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
        tooltip: {
            trigger: 'axis',
        },
        // here data is customised for chart requirements
        dataset: {
            dimensions: ['x_axis_data', 'y_axis_data'],
            source: graphData
        },
        // X-axis propeties can be edited here
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true,
                },

                name: data.labels.x_label,
                min: 0,
                max: 121,
                axisLabel: {
                    show: false,
                    interval: 0, // Show every other label
                    rotate: 30, // Rotate labels for readability
                },
            },
        ],
        // Y-axis propeties can be edited here
        yAxis: [
            {
                type: 'value',
                scale: true,
                showSymbol: false,
                name: data.labels.y_label,
                max: 2000,
                min: 0,
                boundaryGap: [0.2, 0.2],
            },
        ],
        // Series of bars can be edited here
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
            {/* Chart title starts here */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>{data.title}</Text>
                {screensize ? null : <ActionIcon onClick={toggle} ><MdFullscreen size={"2rem"} /></ActionIcon>}
            </Box>
            {/* Chart title ends here */}

            {/* Chart component starts here  */}
            <ReactECharts option={DEFAULT_OPTION} style={{ height: 400 }} />
            {/* Chart component ends here  */}
        </Card>
    );
};

export default BarChart;



