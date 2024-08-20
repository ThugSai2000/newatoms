import React from 'react'
import ReactECharts from 'echarts-for-react';
import { ActionIcon, Box, Card, Text } from '@mantine/core'
import { logDOM } from '@testing-library/react';
import { useFullscreen } from '@mantine/hooks';
import { MdFullscreen } from 'react-icons/md';

const SeriesBarChart = (props) =>
{
    const { ref, toggle, fullscreen } = useFullscreen();
    const { data, screensize } = props
    const ledgerdata = data.ledger
    const src = [["machine", ...ledgerdata]]


    console.log("Bar Series " + JSON.stringify(data));

    function seriesData()
    {
        const newSrcData = data.data.map((item) =>
        {

            const yaxis = item.y_axis_data
            const xaxis = item.x_axis_data
            // console.log("Axis Data " + yaxis, xaxis);
            return [xaxis, ...yaxis]
        })
        src.push(...newSrcData)

    }
    seriesData()
    const maxValue = src[1][3]
    console.log(src);
    const DEFAULT_OPTION = {

        dataset: {
            source: src
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: data.ledger,
            icon: 'rect',
            top: 0
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
            top: 70,
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
                name: data.labels.x_label,


            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                showSymbol: false,
                name: data.labels.y_label,
                max: maxValue,
                // max: 1000,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [

            {
                name: data.ledger[0],
                type: 'bar',
                showSymbol: false,
                color: '#F35122',

            },
            {
                name: data.ledger[1],
                type: 'bar',
                showSymbol: false,
                color: '#0497C0',
            },

        ]
    };
    return (
        <Card padding='lg' shadow="xs" radius="md" ref={ref}>

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

export default SeriesBarChart
