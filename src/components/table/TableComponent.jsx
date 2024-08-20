import React from 'react'
import { Container, Table } from '@mantine/core'

const TableComponent = (props) =>
{
    const { data, id } = props
    const header1 = data.map((body) => body.labels)
    // console.log("data : " + JSON.stringify(data.map(item => Object.entries(item).map(objitem => objitem.ledger))))
    console.log("data : " + JSON.stringify());
    const body = data[0].data
    const header2 = data[0].ledger

    const totalheadscells = [header1[0], ...header2]
    // const header = objData.labels
    // console.log("rows : " + JSON.stringify(objData))

    return (
        <Container fluid >
            <Table verticalSpacing="md" horizontalSpacing='xl' striped shadow='sm' highlightOnHover id={id}>

                <thead style={{
                    position: "sticky",
                    top: 0,
                    background: 'white', zIndex: 3
                }}>
                    <tr>
                        {

                            Object.values(totalheadscells).map((headCell) => <th style={{ width: '100px' }}>{headCell}</th>)
                        }


                    </tr>
                </thead>


                <tbody >
                    {
                        body.map((row) => <tr>{Object.values(row).map((rowcells) => <th>{rowcells}</th>)}</tr>)
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default TableComponent
