
import React from 'react'
import ReactECharts from 'echarts-for-react';
import { Card, Text } from '@mantine/core'

const ReportBarChart = (props) =>
{
    const { data } = props
    var maxY
    if (data.data.length > 0)
    {
        const parsedata = Object.values(data.data[0].y_axis_data).map(parseitem => parseFloat(parseitem))
        // console.log(parsedata);
        maxY = Math.max(...parsedata)
        // console.log(maxY);
    }
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

        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                name: data.labels.x_label,
                // max: 5,
                // min: 0,

            }
        ],

        yAxis: [
            {
                type: 'value',
                scale: true,
                showSymbol: false,
                name: data.labels.y_label,
                max: maxY + 100,
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

            }
        ]
    };
    return (
        <Card padding="lg" shadow="xs" radius="md">
            <Text size="md" className='subcardHeading' style={{ marginBottom: '0.5rem', maxHeight: '300px' }}>{data.title}</Text>
            <ReactECharts
                option={DEFAULT_OPTION}
                style={{ height: 400 }}
            />
        </Card>
    )
}

export default ReportBarChart