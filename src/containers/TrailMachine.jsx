import React, { Suspense } from 'react'
import { Box, Group, ScrollArea, Table, Title } from '@mantine/core';

import { RiFileExcel2Fill, } from 'react-icons/ri'
import { BiSolidFilePdf } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';
import { trailsDataStore, trailsSelectDateStore } from '../Store/store';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import NoDataAvailable from '../components/noDataAvailable/NoDataAvailable';

// Handle tool bar function starts here
export const HandleToolBar = (props) =>
{
    const { name, trailsDataValue } = props
    // const trailsDataValue = useRecoilValue(trailsDataStore)
    const reqDate = useRecoilValue(trailsSelectDateStore)

    const date = new Date(reqDate);

    // Get the year, month, and day of the date.
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Add 1 to get the month index starting from 1 instead of 0.
    const day = date.getDate();

    // Create a new string in the format "2023-11-01" using the year, month, and day values.
    const formattedDateString = `${year}-${month}-${day}`;


    //////////////// *Function for data export to Excel starts here* /////////////


    const exportExcel = () =>
    {
        const sheetData = []
        // console.log(trailsDataValue);

        trailsDataValue.map((packets) =>
        {
            var headers = {}

            var date = "Date"
            headers[date] = packets.timestamp.slice(0, 10)
            var timeStamp = "Time"
            headers[timeStamp] = packets.timestamp.slice(11, 19)

            const packetArr = packets.data
            packetArr.map((names) =>
            {


                const { color, unit, type, control, ...rest } = names
                const key = rest.name

                return headers[key] = rest.value


            })
            return sheetData.push(headers)
        }
        )

        console.log("parsed data : " + JSON.stringify(sheetData))
        // [["Machine", "MID00"], ["Date", 12 / 71 / 56]] +

        var wb = XLSX.utils.book_new()
        // const title = [{ machine: name, date: formattedDateString }]

        var ws = XLSX.utils.json_to_sheet(sheetData)


        // XLSX.utils.sheet_add_json(ws); // Add above row 6

        XLSX.utils.book_append_sheet(wb, ws, "My Sheet");
        const filename = `Trail/${name}/${formattedDateString}`
        XLSX.writeFile(wb, `${filename}.xlsx`);


    }
    //////////////// *Function for data export to Excel endss here* /////////////


    //////////////// *Function for data export to pdf starts here* /////////////
    const exportPdf = () =>
    {
        const doc = new jsPDF({
            plugins: ['jspdf-autotable'], // Enable the autoTable plugin
            orientation: 'landscape', // Set orientation to landscape
        })
        doc.setFillColor('#D3D3D3', 'F'); // Set fill color to yellow
        doc.rect(14, 2, 269, 27, 'F');
        doc.setFontSize(20).text("Trail Data", 120, 15)
        doc.setFontSize(13)

        doc.text(`Machine : ${name}`, 16, 25);
        doc.text(`Date : ${formattedDateString}`, 200, 25)
        // doc.title = "THe title of pdf"
        doc.autoTable({
            html: '#trails-table',
            margin: { top: 35 },
        })

        const filename = `Trail/${name}/${formattedDateString}`
        doc.save(filename)

    }
    return (
        <div id='toolBar'> <Box
            sx={{
                display: 'flex',
                gap: '16px',
                padding: '8px',
                paddingLeft: '0px',
                flexWrap: 'wrap',
                marginBottom: '0.5rem',
                justifyContent: 'space-between'

            }}
        >
            <Title color='var(--color-bold-text)' size={'1.2rem'} weight={500}>Machine Data</Title>
            <Group w={'6rem'} sx={{ gap: '2rem' }}>
                <BiSolidFilePdf color='var(--color-onclick)' transform='scale(2)' onClick={exportPdf} />
                <RiFileExcel2Fill color='var(--color-onclick)' transform='scale(2)' onClick={exportExcel} />
            </Group>



        </Box></div>
    )
}
//  Handle tool bar function ends here

// Trail manchine Container starts here
const TrailMachine = (props) =>
{
    // const trailsDataValue = useRecoilValue(trailsDataStore)
    const { trailsDataValue } = props
    // console.log("trails Data Value " + JSON.stringify(trailsDataValue))
    const firstObjectOfData = trailsDataValue[0]

    // function for filtering sensor names starts here
    var filterSensorNames = []

    if (firstObjectOfData !== undefined)
    {
        const b = JSON.stringify(firstObjectOfData.data)
        const a = JSON.parse(b)
        // console.log("a  " + JSON.stringify(a))
        const z = (a).map((names) =>
        (

            filterSensorNames.push(names.name)
        ))
    }
    // function for filtering sensor names ends here

    // function for filtering timestamp starts here
    const timeConvereted = []

    const trails = () =>
    {
        const a = trailsDataValue.map((key) => (key.timestamp))
        // console.log(a)
        a.forEach((time) =>
        {
            const c = time.substring(11, 19)
            // console.log("ccccc  " + c)
            timeConvereted.push(c)
        })

    }
    trails()
    // function for filtering timestamp ends here

    // console.log(Object.keys(trailsDataValue[0].map((key) => key.name)))
    return (
        <div >
            {/* Table component starts here */}
            {trailsDataValue.length > 0 ? <ScrollArea offsetScrollbars h={400} >
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

            </ScrollArea> : <NoDataAvailable />}
            {/* Table component ends here */}
        </div>

    )
}

export default TrailMachine