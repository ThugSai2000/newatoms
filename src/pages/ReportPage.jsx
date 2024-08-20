import React, { useRef, useState } from 'react'
import { Box, Button, Container, Flex, Grid, Group, Paper, ScrollArea, Select, SimpleGrid, Table, Text, Title } from '@mantine/core'
import * as XLSX from 'xlsx';

import { DatePickerInput } from '@mantine/dates'
import SegmentControlComponent from '../components/segmentControl/SegmentControlComponent'
import { BiCalendarAlt, BiSolidFilePdf } from 'react-icons/bi'
import { RiFileExcel2Fill } from 'react-icons/ri'

import { segmentControlState } from '../Store/store'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import client from '../API/API'
import jsPDF from 'jspdf'
import LineChart from '../components/charts/LineChart'
import SeriesBarChart from '../components/charts/SeriesBarChart'
import ReportBarChart from '../components/charts/ReportBarChart';
import ReportSeriesLine from '../components/charts/ReportSeriesLine';
import html2canvas from 'html2canvas';
import NoDataAvailable from '../components/noDataAvailable/NoDataAvailable';
import RunTimeTable from '../components/table/RunTimeTable';
import { useNavigate } from 'react-router-dom';


const ReportPage = () =>
{
    // hooks to display table or graph
    const [tableDisplay, setTableDisplay] = useState(true);
    const [graphDisplay, setGraphDisplay] = useState(false);

    // global store for storing the state of table or graph to dispaly in UI
    const val = useRecoilValue(segmentControlState);



    const [date, setDate] = useState([])

    const [csvdata, setCsv] = useState([])
    const convertedDates = []
    const [displayBody, setDisplayBody] = useState(false)
    // ////
    const [data, setData] = useState([]);
    const [machineListData, setMachineListData] = useState([])
    const [selectedValues, setSelectedValues] = useState({});
    const [dependentDropdownOptions, setDependentDropdownOptions] = useState({});
    const [lastSelectednode, setLastselectedNode] = useState(null)
    const [machineDropdownstatus, setMachineDropdownstatus] = useState(false)
    const [machines, setMachines] = useState(null)
    const [models, setmodels] = useState(null)
    const [selectedModel, setSelectedModel] = useState(null)
    const [selectedMachine, setSelectedMachine] = useState(null)
    const [reportType, setReportType] = useState([])
    const [selectedReportType, setSelectedReportType] = useState(null)
    const [nodedata, setNodedata] = useState([])
    const [machineid, setMachineid] = useState("")
    const [reportData, setReportData] = useState([])
    // const [loading, setLoading] = useState(null)
    const [enable, setEnable] = useState(true)
    const [buttonState, setButtonState] = useState("Get Machines")
    const navigate = useNavigate();
    // pdf generator for graph
    const componentRef = useRef(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    // Function for generating graph in PDF
    const graphPdf = async () =>
    {
        setIsGeneratingPdf(true);

        const element = componentRef.current;
        const canvas = await html2canvas(element);
        const imageData = canvas.toDataURL('image/png');

        const doc = new jsPDF();
        const imgProps = doc.getImageProperties(imageData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.setFillColor('#D3D3D3', 'F'); // Set fill color to yellow
        doc.rect(0, 0, pdfWidth, 27, 'F');
        doc.setFontSize(20).text("Report Data", doc.internal.pageSize.getWidth() / 2, 10, null, null, 'center')
        doc.setFontSize(13)
        doc.text(`Machine : ${machineid}`, 16, 25);
        doc.text(`Date : From ${convertedDates[0]} to ${convertedDates[1]}`, 125, 25)


        doc.addImage(imageData, 'PNG', 0, 35, pdfWidth, pdfHeight);
        const filename = `Report/${machineid}/${convertedDates[0]}-${convertedDates[1]}.pdf`
        doc.save(filename)

        setIsGeneratingPdf(false);

    };


    const allDates = date.map((date) =>
    {
        const newDate = new Date(date)
        const year = newDate.getFullYear()
        const month = newDate.getMonth() + 1
        const day = newDate.getDate()
        convertedDates.push(`${year}-${month}-${day}`)
    })

    // Function for exporting data to pdf
    const exportPdf = () =>
    {
        const doc = new jsPDF("landscape")
        doc.setFillColor('#D3D3D3', 'F'); // Set fill color to yellow
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, 'F');
        doc.setFontSize(20).text("Report Data", 120, 15)
        doc.setFontSize(13)

        doc.text(`Machine : ${machineid}`, 16, 25);
        doc.text(`Date : From ${convertedDates[0]} to ${convertedDates[1]}`, 190, 25)
        doc.autoTable({
            html: '#reports-table',
            margin: { top: 35 },

        })
        const filename = `Report/${machineid}/${convertedDates[0]}-${convertedDates[1]}.pdf`
        doc.save(filename)
        // doc.save()
    }

    // function for exporting to excel starts here

    const exportExcel = () =>
    {
        const header = reportData.map((body) => body.labels.x_label)

        const thead = [...header, ...reportData[0].ledger]

        const body = reportData[0].data

        const sheetData = [thead]


        body.map((row) =>
        {
            const rows = []
            Object.values(row).map((rowcells, index) =>
            {

                if (index === 0)
                {

                    const time = rowcells
                    return rows.push(time)
                }
                else
                {
                    return rows.push(...rowcells)
                }



            })
            sheetData.push(rows)
        })
        console.log("thead : " + JSON.stringify(sheetData));


        var wb = XLSX.utils.book_new()

        var ws = XLSX.utils.json_to_sheet(sheetData)
        XLSX.utils.book_append_sheet(wb, ws, "My Sheet");
        const filename = `Report/${machineid}/${convertedDates[0]}-${convertedDates[1]}`

        XLSX.writeFile(wb, `${filename}.xlsx`);
    }
    // function for exporting to excel ends here

    // Function for setting to display the table or graph
    useEffect(() =>
    {
        setTableDisplay(val === "table" ? true : false);
        setGraphDisplay(val !== "table" ? true : false);

    }, [val])




    // Function for Getting Report Module Rest api

    useEffect(() =>
    {
        client.get("/Reports_module/", {
            headers: {
                "Content-Type": "application/json",
                "user-id": window.localStorage.getItem('userid')
            },
        })
            .then((resp) =>
            {
                if (resp.data.status === "login_required")
                {

                    window.localStorage.clear()
                    window.location.reload()
                    navigate('/login')
                    // setError(`Got error while connecting with status ${response.status}`)
                } else
                {
                    setData(resp.data.drop_down)
                    setReportType(resp.data.report_titles)
                }


            }).catch((error) =>
            {
                console.error("Error fetching machines:", error);
                // Handle error, e.g., display an error message to the user
            });
    }, [navigate])



    // Function for making dependency dropdowns starts here

    useEffect(() =>
    {
        // Update dependent dropdown options based on selected value
        // console.log(selectedValues)
        const selectedType = Object.keys(selectedValues)[0]; // Assuming only one type can be selected at a time

        if (selectedType)
        {

            data.forEach(item =>
            {
                if (item.node === selectedValues[selectedType])
                {
                    setLastselectedNode(item.node_id)
                }
            })
            const selectedNode = selectedValues[selectedType];

            // Filter data for remaining dropdowns


            // Update options for remaining dropdowns
            const updatedOptions = {};
            data.filter(item => item.type !== selectedType).forEach(item =>
            {
                const filteredOptions = item.parent.includes(selectedNode)
                    ? data.node // Extract nodes here
                    : [];
                updatedOptions[item.type] = filteredOptions;
            });

            setDependentDropdownOptions({ ...updatedOptions });
        }
    }, [selectedValues, data]);
    // Function for making dependency dropdowns ends here

    // function for filtering type in the data
    const dropdownArr = []
    data.forEach((item) =>
    {
        if (!dropdownArr.includes(item.type))
        {
            dropdownArr.push(item.type);
        }
    });

    // Unique Company or Machnie Names filtered starts here
    const uniqueDropdownArr = [...new Set(dropdownArr)];
    // Unique Company or Machnie Names filtered ends here

    // Function for getting Machine name for dropdowns starts here
    const arr1 = []
    machineListData.map((item) =>
    {
        if (selectedModel === item.Model_No)
        {
            arr1.push(item.Machine_Name)
        }

    })
    // Function for getting Machine name for dropdowns ends here

    // Function for getting machine id starts here
    useEffect(() =>
    {

        const selectedMachineid = () =>
        {
            // console.log(nodedata);
            nodedata.map((machine) =>
            {
                if (machine.Machine_Name === selectedMachine)
                {
                    // nodeid = machine.node_id
                    setMachineid(machine.Machine_id)
                    // console.log(machine.node_id)
                }
            })
        }
        // if (nodedata.length > 0)
        // {
        selectedMachineid()
        // }
    }, [nodedata, selectedMachine])
    // Function for getting machine id ends here

    // Function for handling dropdown selection
    const handleDropdownChange = (type, value) =>
    {

        setSelectedValues({ [type]: value });
        setEnable(false)
    };


    const handleGetMachines = async () =>
    {
        setButtonState('Reset')
        try
        {
            const res = await client.get("/Report_List/", {

                params: {
                    node_id: lastSelectednode
                }
            })
            // console.log(JSON.stringify(resp.data));
            setNodedata(res.data.machines)
            setMachineListData(res.data["machines"])
            // Assuming the API response has a structure like:
            // { machines: [{ model_number: 123, name: "Machine A" }, ...] }
            const modelNumbers = res.data["machines"].map(machine => machine.Model_No);
            const machineNames = res.data["machines"].map(machine => machine.Machine_Name);

            setmodels(modelNumbers);
            setMachines(machineNames)

            // setMachines(arr)
            setMachineDropdownstatus(true);

        } catch (error)
        {

            console.error("Error fetching machines:", error);

        }

    }

    // Function for reset button starts here
    const resetButton = () =>
    {
        setSelectedValues({})
        setEnable(true)
        setButtonState("Get Machines")
        setMachineDropdownstatus(false)
        setDependentDropdownOptions({})
        setSelectedReportType(null)
        setDate([])
        setSelectedMachine(null)
        setDisplayBody(false)
        setReportData([])
        // reset()
    };
    // Function for reset button ends here

    // Function to get report details rest api starts here
    const onClickReport = async () =>
    {
        setEnable(true)
        // const endtime = convertedDates[1] === "1970-0-1" || undefined || null ? convertedDates[0] : convertedDates[1]
        const request = {
            machine_id: machineid,
            start_datetime: convertedDates[0],
            end_datetime: convertedDates[1] === "1970-0-1" || undefined || null ? convertedDates[0] : convertedDates[1],
            report_type: selectedReportType,
            user_id: window.localStorage.getItem('userid'),
        }

        try
        {

            const res = await client.post('/Reports_details/', request, {
                withCredentials: true,
            })
            const reportData = res.data.report_details.resultant_data

            setReportData(reportData)
            setDisplayBody(true)

        } catch (error)
        {
            console.log(error)

        } finally
        {
            setEnable(false)
        }

    }
    // Function to get report details rest api ends here

    // table header Filtered Data

    const tableHead = reportData.map((headcells) =>
    {
        const newtablehead = []
        const time = headcells.labels.x_label

        const ledger = headcells.ledger
        newtablehead.push(time, ...ledger)
        return newtablehead
    })
    // console.log("table Head : " + tableHead);
    const tableBody = reportData.map((body) =>
    {
        return body.data
    })
    // console.log("Table body : " + JSON.stringify(...tableBody));


    return (
        <Container fluid ml={10} mt={"0.3rem"} >
            {/* <ScrollArea h={952}> */}
            {/* Page title */}

            <Box mt={20} p={'1rem'} pt={0}>
                {/* Company Based Dropdowns Starts here */}
                <SimpleGrid cols={6} gap={"md "}>
                    {uniqueDropdownArr.map((type, index) =>
                    {

                        const options = dependentDropdownOptions[type] || [...new Set(data.filter(item => item.type === type).map(item => item.node))];
                        return <Select
                            key={index}
                            allowDeselect
                            label={type}
                            searchable
                            clearable
                            data={options}
                            value={selectedValues[type]}
                            onChange={(value) => handleDropdownChange(type, value)}
                            // {...form.getInputProps('selectedMachine')}
                            nothingFound="No options"

                        />

                    })}
                    <Button mt={"1.5rem"} type='submit'
                        onClick={buttonState === "Get Machines" ? handleGetMachines : resetButton}
                        disabled={enable ? true : false}
                    >{buttonState}</Button>
                    {/* Company Based Dropdowns Starts here */}

                    {/* Company Based Dropdowns Starts here */}
                </SimpleGrid>
                {
                    machineDropdownstatus === true ? (

                        <SimpleGrid cols={6} mt={20}>
                            <Select label="Model number"
                                placeholder='Select options'
                                searchable
                                clearable
                                nothingFound="No options"
                                data={models}
                                value={selectedModel}
                                onChange={(value => setSelectedModel(value))}
                            />
                            <Select
                                label="Machines"
                                placeholder='Select options'
                                searchable
                                clearable
                                nothingFound="No options"
                                data={selectedModel === null ? machines : arr1}
                                value={selectedMachine}
                                onChange={(value => setSelectedMachine(value))}
                            />
                            <Select
                                label="Report Type"
                                placeholder='Select options'
                                searchable
                                clearable
                                data={reportType}
                                value={selectedReportType}
                                onChange={(value => setSelectedReportType(value))}
                                nothingFound="No options"
                            />
                            <DatePickerInput
                                styles={{
                                    calendar: {
                                        width: '220px',
                                    },
                                    day: {
                                        width: '30px'
                                    }
                                }}
                                icon={<BiCalendarAlt size='1.3rem' color='var(--color-icon)' />}
                                label='Date'
                                type='range'
                                labelSeparator=' to '
                                valueFormat='YYYY-MM-DD'
                                value={date}
                                onChange={(value) => setDate(value)}
                            // w={240}
                            // mr={'2rem'}
                            />

                            <Button disabled={(selectedMachine && date.length !== 0 && selectedReportType !== null) ? false : true} loading={enable} mt={25} onClick={onClickReport} >
                                Search
                            </Button>

                        </SimpleGrid>
                        //  Company Based Dropdowns Ends here 

                    ) : (null)
                }
            </Box>


            {displayBody &&
                <Box mt={16} ml={16}>
                    {/* Generating Report Table & Graph buttons Starts  */}
                    <Flex justify={'space-between'} align={'center'} pr={'1rem'} >
                        <Title size={18} color='var(--color-bold-text)' fw={500}>Machine Data</Title>

                        <Group sx={{ gap: '2rem' }} position='right'>
                            <SegmentControlComponent data={[{ label: 'Table', value: 'table' }, { label: 'Graph', value: 'graph' }]}
                            />
                            <BiSolidFilePdf color='var(--color-onclick)' transform='scale(2)' onClick={tableDisplay ? exportPdf : graphPdf} />
                            <RiFileExcel2Fill color='var(--color-onclick)' transform='scale(2)' onClick={exportExcel} />
                        </Group>
                    </Flex>
                    {/* Generating Report Table & Graph buttons Starts  */}

                    {/* Table component Starts Here */}
                    <Paper mt={17} shadow='xs' >
                        {/* <ScrollArea h={380}> */}
                        {
                            <div style={{ padding: '0px' }}>
                                <ScrollArea h={400} p={0} >
                                    {/* {reportData.length > 0 ?
                                            (<TableComponent id='reports-table' data={reportData} />) : (<LoaderComponent />)} */}
                                    {/* Table component For Runtime & General tables data */}
                                    {reportData.length > 0 ?
                                        <Container fluid p={0}>
                                            {
                                                reportData[0].card === "RunTime" ? <RunTimeTable data={reportData} /> :

                                                    <Table verticalSpacing="md" horizontalSpacing='xl' striped shadow='sm' highlightOnHover id='reports-table' p={0}>

                                                        <thead style={{
                                                            position: "sticky",
                                                            top: 0,
                                                            background: 'white', zIndex: 6,

                                                        }}>
                                                            <tr style={{
                                                                position: "sticky",
                                                            }}>
                                                                {

                                                                    tableHead[0].map((headCell) => <th style={{ width: '100px' }}>{headCell}</th>)

                                                                }
                                                            </tr>
                                                        </thead>


                                                        <tbody >
                                                            {
                                                                tableBody[0].map((row) =>
                                                                {
                                                                    const totalCells = [row.x_axis_data, ...row.y_axis_data]
                                                                    return <tr >{totalCells.map(cells => <td style={{ fontWeight: 'normal' }}>{cells}</td>)}</tr>
                                                                })

                                                            }
                                                        </tbody>
                                                    </Table>
                                            }



                                        </Container>
                                        : <NoDataAvailable />
                                    }
                                </ScrollArea>
                            </div>
                        }
                        {/* Graph compponent Starts here */}
                        {
                            graphDisplay &&

                            <div ref={componentRef}>
                                {

                                    reportData.map((card) =>
                                    {

                                        if (card.card === "Line")
                                        {
                                            const ledger = card.ledger
                                            if (ledger.length > 1)
                                            {
                                                return <ReportSeriesLine data={card} />

                                            } else
                                            {
                                                return <LineChart data={card} />
                                            }


                                        }
                                        if (card.card === "Bar")
                                        {

                                            const ledger = card.ledger
                                            if (ledger.length > 1)
                                            {
                                                return <SeriesBarChart data={card} />
                                            } else
                                            {
                                                return <ReportBarChart data={card} />
                                            }
                                        }
                                    }
                                    )
                                }



                            </div>

                        }
                        {/* Graph compponent Starts here */}

                        {/* </ScrollArea> */}
                    </Paper>
                    {/* Table component ends Here */}
                </Box>
            }

        </Container>
    )
}

export default ReportPage
