import { Box, Button, Card, Container, Flex, Group, Paper, Select, SimpleGrid, Skeleton, Text, Title } from '@mantine/core'
import { DatePickerInput, DatesProvider } from '@mantine/dates';
import React, { Suspense, useEffect, useState } from 'react'
// import TrailsMachineData, { HandleToolBar } from '../components/Trails/TrailsMachineData';

import client from '../API/API';

import { BiCalendarAlt } from 'react-icons/bi';
import SelectDropdown from '../components/selectDropdown/SelectDropdown';
import ButtonComponent from '../components/button/ButtonComponent';
import LoaderComponent from '../components/loader/LoaderComponent';
import TrailMachine, { HandleToolBar } from '../containers/TrailMachine';
import { suspend } from 'suspend-react';
import { useNavigate } from 'react-router-dom';




const TrailPage = () =>
{

    const [trailsData, setTrailsData] = useState([])
    const [dateValue, setDateValue] = useState(new Date())
    const [trailTableVisible, setTrailTableVisible] = useState(false)
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
    const [nodedata, setNodedata] = useState([])
    const [nodeid, setNodeid] = useState("")

    const [loading, setLoading] = useState(null)
    const [enable, setEnable] = useState(true)
    const [buttonState, setButtonState] = useState("Get Machines")
    // console.log("trails node data : " + nodedata);
    const navigate = useNavigate();

    // Create a new Date object from the given date string.
    const date = new Date(dateValue);

    // Get the year, month, and day of the date.
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Add 1 to get the month index starting from 1 instead of 0.
    const day = date.getDate();

    // Create a new string in the format "2023-11-01" using the year, month, and day values.
    const formattedDateString = `${year}-${month}-${day}`;

    // console.log("node data : " + JSON.stringify(nodedata));

    // Function for Getting Trail Module Rest api
    useEffect(() =>
    {
        client.get("/Trail_module/", {
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
    const arr2 = []
    machineListData.map((item) =>
    {

        if (selectedModel === item.Model_No)
        {
            return arr2.push(item.Machine_Name)
        }

    })
    // Function for getting Machine name for dropdowns ends here


    //Function for selected machine getting node id

    useEffect(() =>
    {


        const selectednodeid = () =>
        {
            // console.log(nodedata);
            nodedata.map((machine) =>
            {
                if (machine.Machine_Name === selectedMachine)
                {
                    // nodeid = machine.node_id
                    setNodeid(machine.node_id)
                    // console.log(machine.node_id)
                }
            })
        }
        // if (nodedata.length > 0)
        // {
        // selectednodeid()
        // }
        if (selectedMachine !== null)
        {
            selectednodeid()
            setLoading(true)

        }
    }, [nodedata, selectedMachine])
    //Function for selected machine getting node id

    // Function for handling dropdown selection
    const handleDropdownChange = (type, value) =>
    {
        setSelectedValues({ [type]: value });
        setEnable(false)

    };
    const handleGetMachines = () =>
    {
        setButtonState('Reset')
        client.get("/Trail_List/", {

            params: {
                node_id: lastSelectednode
            }
        }).then((resp) =>
        {
            // console.log(JSON.stringify(resp.data));
            setNodedata(resp.data.machines)
            setMachineListData(resp.data["machines"])
            // Assuming the API response has a structure like:
            // { machines: [{ model_number: 123, name: "Machine A" }, ...] }
            const modelNumbers = resp.data["machines"].map(machine => machine.Model_No);
            const machineNames = resp.data["machines"].map(machine => machine.Machine_Name);

            setmodels(modelNumbers);
            setMachines(machineNames)

            // setMachines(arr)
            setMachineDropdownstatus(true);

        }).catch((error) =>
        {
            console.error("Error fetching machines:", error);
            // Handle error, e.g., display an error message to the user
        });

    }

    // Function for reset button starts here
    const resetButton = () =>
    {
        setSelectedValues({})
        setEnable(true)
        setButtonState("Get Machines")
        setMachineDropdownstatus(false)
        setDependentDropdownOptions({})
        setDateValue(new Date())
        setSelectedMachine(null)
        setTrailTableVisible(false)
        setTrailsData([])
        // reset()
    };
    // Function for reset button ends here




    // Function to get trail details rest api starts here
    const handleTrailsData = async () =>
    {
        setEnable(true)
        // setLoading(true)
        try
        {
            const response = await client.get('/Trail_details/', {
                params: {
                    node_id: nodeid,
                    date: formattedDateString,
                },
                withCredentials: true,
            });

            setTrailsData(response.data.Trail_Details);
            setTrailTableVisible(true);

            // console.log('Trails:', response.data.Trail_Details); // Optional: Log for debugging
        } catch (error)
        {
            console.error('Error fetching trail details:', error);
            // Handle the error gracefully, e.g., display an error message to the user
        } finally
        {
            setEnable(false)
        }


    }
    // Function to get trail details rest api ends here


    // mt={40}
    return (
        <Container fluid ml={10} mt={"0.3rem"}>
            {/* <Box mt={7}><Title color='var(--color-bold-text)' size={24} fw={500}>Trail</Title></Box> */}

            <Box mt={20} p={'1rem'} pt={0}>
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


                </SimpleGrid>
                {
                    machineDropdownstatus === true ? (

                        <Group mt={20}>
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
                                data={selectedModel === null ? machines : arr2}
                                value={selectedMachine}
                                onChange={(value => setSelectedMachine(value))}
                            />
                            <DatePickerInput
                                icon={<BiCalendarAlt size='1.3rem' color='var(--color-icon)' />}
                                value={dateValue}
                                styles={{
                                    calendar: {
                                        width: '220px',
                                    },
                                    day: {
                                        width: '30px'
                                    }
                                }}
                                onChange={setDateValue}
                                valueFormat="YYYY-MM-DD"
                                label='Date'
                                highlightToday={true}
                            />


                            {/* <ButtonComponent mt={25} color='var(--color-onclick)' onClick={handleTrailsData}>Search
                            </ButtonComponent> */}
                            <Button disabled={selectedMachine !== null ? false : true} mt={25} color='var(--color-onclick)' loading={enable} onClick={handleTrailsData}>Search
                            </Button>

                        </Group>

                    ) : (null)
                }
            </Box>

            {trailTableVisible && <Container fluid mt={10}>
                <HandleToolBar name={selectedMachine} date={formattedDateString} trailsDataValue={trailsData} />
                {

                    <Paper mt={17} shadow='xs'>

                        {
                            trailsData ? <TrailMachine trailsDataValue={trailsData} /> : <LoaderComponent />
                        }

                    </Paper>

                }
            </Container>
            }
        </Container>

    )
}

export default TrailPage