import { Container, Table } from '@mantine/core'
import React, { useEffect, useState } from 'react'

const RunTimeTable = (props) =>
{

    const { data } = props
    const [newData, setNewData] = useState([])
    const header = ["Timestamp", ...data[0].ledger]
    const formattedTime = (time) =>
    {
        const value = time; // Time in seconds
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        const seconds = value % 60;

        const formattedTime = `${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`;
        return formattedTime
    }

    useEffect(() =>
    {
        const newData = []
        if (data[0].data.length > 0)
        {
            data[0].data.map((data) =>
            {
                const idleTime = 86400 - (parseInt(data.value[0]) + parseInt(data.value[1]))
                return newData.push([data.Timestamp, formattedTime(data.value[0]), formattedTime(data.value[1]), formattedTime(idleTime)])
            })
        }
        setNewData(newData)
    }, [data])

    // console.log(newData);





    return (
        <Container fluid p={0}>
            {newData.length === data[0].data.length ?
                <Table verticalSpacing="md" horizontalSpacing='xl' striped shadow='sm' highlightOnHover >

                    <thead style={{
                        position: "sticky",
                        top: 0,
                        background: 'white', zIndex: 3
                    }}>
                        <tr style={{
                            position: "sticky",


                        }}>
                            {
                                // JSON.stringify(data[0].ledger)
                                header.map((headCell) => <th style={{ width: '100px' }}>{headCell}</th>)
                            }
                        </tr>
                    </thead>


                    <tbody >
                        {
                            // JSON.stringify(newData)
                            newData.map((row) =>
                            {
                                return <tr >{row.map(cells => <td style={{ fontWeight: 'normal' }}>{cells}</td>)}</tr>
                            })
                        }
                    </tbody>
                </Table>
                : null
            }
        </Container>
    )
}

export default RunTimeTable
