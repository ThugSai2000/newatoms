import { ActionIcon, Box, Card, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { MdFullscreen } from 'react-icons/md';
import { useFullscreen } from '@mantine/hooks';

const LineChart = (props) =>
{
    const { data, screensize } = props
    const { ref, toggle, fullscreen } = useFullscreen();
    const [maxLen, setMaxLen] = useState(0)

    useEffect(() =>
    {
        if (data.data.length > 0)
        {
            const parsedata = Object.values(data.data[0].y_axis_data).map(parseitem => parseInt(parseitem))
            // console.log(parsedata);
            const maxY = Math.max(...parsedata)
            setMaxLen(maxY)
            // console.log(maxY);
        }
    }, [data.data])




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

            dimensions: ['x_axis_data', 'y_axis_data'],
            source: data.data
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
        visualMap: {
            show: false,
            min: 0,
            max: 1000,
            color: ['#6CB4EE']
        },
        xAxis: [
            {
                type: 'category',
                name: data.labels.x_label,
                axisTick: {
                    alignWithLabel: true
                },
                // boundaryGap: false,
                // data: ["Mon", "Tue", "wed", "Thur"]
            }
        ],

        yAxis: [
            {
                type: 'value',
                scale: true,
                showSymbol: false,
                name: data.labels.y_label,
                max: maxLen + 100,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [

            {
                name: data.ledger[0],
                type: 'line',
                showSymbol: false,
                color: '#6CB4EE',
                // data: [1, 5, 8, 10]
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

export default LineChart
