import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { Card, Text } from '@mantine/core'

const ReportSeriesLine = (props) =>
{
    const { data } = props


    const [graphData, setGraphData] = useState([])
    const [length, setLength] = useState()



    // console.log(data);

    useEffect(() =>
    {
        const ledgerdata = data.ledger
        const src = [["Timestamp", ...ledgerdata]]
        function seriesData()
        {
            const datas = []
            const newSrcData = data.data.map((item) =>
            {
                const yaxis = item.y_axis_data
                const xaxis = item.x_axis_data
                return [xaxis, ...yaxis]
            })
            datas.push(...newSrcData)

            const reverse = datas.reverse()
            src.push(...reverse)

        }
        seriesData()
        // const limitedData = src
        setGraphData(src);




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
                    show: true,
                    // interval: 0, 
                    // rotate: 30, 
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
                showSymbol: true,
                color: '#0497C0',
            },

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

export default ReportSeriesLine
