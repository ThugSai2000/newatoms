import React, { Suspense } from 'react'
import { Box, Group, ScrollArea, Table, Title } from '@mantine/core';

import { RiFileExcel2Fill, } from 'react-icons/ri'
import { BiSolidFilePdf } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';
import { trailsDataStore, trailsSelectDateStore } from '../../Store/store';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';


const HandleToolBar = (props) =>
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


    ////////////////Function for exporting to Excel starts here* /////////////


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


        var wb = XLSX.utils.book_new()

        var ws = XLSX.utils.json_to_sheet(sheetData)

        XLSX.utils.book_append_sheet(wb, ws, "My Sheet");
        const filename = `Trail/${name}/${formattedDateString}`
        XLSX.writeFile(wb, `${filename}.xlsx`);


    }
    // Function for exporting to Excel ends here*


    // Function for expoting data to pdf starts here
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

    // Function for exporting data to pdf ends here
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
            {/* Header for Trails data starts here */}
            <Title color='var(--color-bold-text)' size={'1.2rem'} weight={500}>Machine Data</Title>
            <Group w={'6rem'} sx={{ gap: '2rem' }}>
                <BiSolidFilePdf color='var(--color-onclick)' transform='scale(2)' onClick={exportPdf} />
                <RiFileExcel2Fill color='var(--color-onclick)' transform='scale(2)' onClick={exportExcel} />
            </Group>

            {/* Header for Trails data ends here */}

        </Box></div>
    )
}
export default HandleToolBar