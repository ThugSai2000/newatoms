import { ScrollArea, Table } from '@mantine/core'
import React from 'react'

const Trailtable = (props) =>
{
    const { trailsDataValue, filterSensorNames } = props
    return (

        <ScrollArea offsetScrollbars h={400} >
            <Table verticalSpacing="md" horizontalSpacing='xl' striped shadow='sm' id='trails-table'>
                <thead style={{
                    position: "sticky",
                    top: 0,
                    width: 'auto', background: 'white', zIndex: 3
                }}>
                    <tr><th style={{ position: 'sticky', left: '0.1px', background: 'white', textAlign: 'left', zIndex: 6 }}> Date </th><th style={{ position: 'sticky', left: '4.8rem', background: 'white', textAlign: 'left', zIndex: 6 }}> Time </th>{
                        filterSensorNames.map((key) => (<th>{key}</th>))
                    }</tr>

                </thead>


                <tbody >

                    {

                        trailsDataValue.map((key, index) => (

                            <tr key={index} >
                                <td style={{ position: 'sticky', left: '0.1px', background: 'inherit', zIndex: 2 }}>{key.timestamp.slice(0, 10)}</td>
                                <td style={{ position: 'sticky', left: '4.8rem', background: 'inherit', zIndex: 2 }}>{key.timestamp.slice(11, 19)}</td>
                                {key.data.map((key2, index) => (
                                    <td key={index}>{key2.value}</td>
                                ))}</tr>)

                        )

                    }

                </tbody>
            </Table>

        </ScrollArea>

    )
}

export default Trailtable
