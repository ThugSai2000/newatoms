import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ActionIcon, Box, Button, Card, Container, Group, Select, SimpleGrid, Tabs, Text, Title, } from '@mantine/core';
import '../components/GeneralMachineDetails/CSS/machinesDetails.css';
import client from '../API/API';
import SelectDropdown from '../components/selectDropdown/SelectDropdown.jsx';
import ButtonComponent from '../components/button/ButtonComponent.jsx';
import LoaderComponent from '../components/loader/LoaderComponent.jsx';
import { MdFullscreen } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';

const StatusMachines = lazy(() => import('../containers/StatusMachines.jsx'));
const DetailsMachines = lazy(() => import('../containers/DetailsMachines.jsx'));
const KpiMachines = lazy(() => import('../containers/KpiMachines.jsx'));
const ControlMachines = lazy(() => import('../containers/ControlMachines.jsx'));




const MachinePage = () =>
{

    const [data, setData] = useState([]);
    const [machineListData, setMachineListData] = useState([]);
    const [selectedValues, setSelectedValues] = useState({});
    const [dependentDropdownOptions, setDependentDropdownOptions] = useState({});
    const [lastSelectednode, setLastselectedNode] = useState(null);
    const [machineDropdownstatus, setMachineDropdownstatus] = useState(false);
    const [machines, setMachines] = useState(null);
    const [models, setmodels] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [nodedata, setNodedata] = useState([]);
    const [nodeid, setNodeid] = useState("");
    const [machineid, setMachineid] = useState("");
    const [tabs, setTabs] = useState([]);
    const [fullScreen, setFullscreen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [enable, setEnable] = useState(true);
    const [buttonState, setButtonState] = useState("Get Machines");

    const navigate = useNavigate();

    // full screen function
    const divref = useRef(null);

    const handleFullScreen = () =>
    {
        if (!document.fullscreenElement)
        {
            divref.current.requestFullscreen().then(() =>
            {
                setFullscreen(true);
            });
        } else
        {
            document.exitFullscreen().then(() =>
            {
                setFullscreen(false);
            });
        }
    }

    // Function for Getting Machine Module Rest api

    useEffect(() =>
    {
        client.get("/Machine_module/", {
            headers: {
                "Content-Type": "application/json",
                "user-id": window.localStorage.getItem('userid')
            },
            withCredentials: true
        })
            .then((resp) =>
            {

                if (resp.data.status === "login_required")
                {
                    window.localStorage.clear();
                    window.location.reload();
                    navigate('/login');

                } else
                {
                    setData(resp.data.drop_down);
                    setTabs(resp.data.sub_pages);
                }

            }).catch((error) =>
            {
                console.error("Error fetching machines:", error);
            });
    }, [navigate])


    // useEffect(() =>
    // {
    //     const selectedType = Object.keys(selectedValues)[0];
    //     const selectedNode = Object.values(selectedValues)[0];

    //     if (selectedNode)
    //     {
    //         const updatedOptions = {};


    //         // const filteredOptions = item.parent.some(parentNode => parentNode === selectedNode)
    //         //     ? data.filter(node => node.parent.includes(selectedNode) && node.type === item.type).map(node => node.node)
    //         //     : [];

    //         data.filter(item => item.type !== selectedType).forEach(item =>
    //         {
    //             const filteredOptions = data.filter(node => node.parent.includes(selectedNode) && node.type === item.type).map(node => node.node) // Extract nodes here

    //             updatedOptions[item.type] = filteredOptions;
    //         })



    //         setDependentDropdownOptions({ ...updatedOptions });

    //         data.forEach(item =>
    //         {
    //             if (item.node === selectedNode)
    //             {
    //                 setLastselectedNode(item.node_id)

    //             }
    //         })
    //     }
    //     // setSelectedValues({})
    //     // setDependentDropdownOptions({})

    // }, [selectedValues, data]);




    const dropdownArr = []

    // function for filtering type in the data

    data.forEach((item) =>
    {
        if (!dropdownArr.includes(item.type))
        {
            dropdownArr.push(item.type);
        }
    });


    const uniqueDropdownArr = [...new Set(dropdownArr)];

    // Function for getting Machine name for dropdowns
    let machine = []
    machineListData.map((item) =>
    {
        if (selectedModel === item.Model_No)
        {
            machine.push(item.Machine_Name);
        }

    })

    // Function for handling dropdown selection
    const handleDropdownChange = (type, value) =>
    {
        setSelectedValues({ [type]: value });
        setEnable(false);

        // console.log("Handle dropdown" + JSON.stringify({ [type]: value }));
        const selectedType = type;
        const selectedNode = value;

        if (selectedNode)
        {
            const updatedOptions = {};

            data.filter(item => item.type !== selectedType).forEach(item =>
            {
                const filteredOptions = data.filter(node => node.parent.includes(selectedNode) && node.type === item.type).map(node =>
                {

                    return node.node;
                }) // Extract nodes here

                updatedOptions[item.type] = filteredOptions;

            })

            setDependentDropdownOptions({ ...updatedOptions });


            data.forEach(item =>
            {
                if (item.node === selectedNode)
                {

                    setLastselectedNode(item.node_id);

                }
            })
        } else
        {
            setDependentDropdownOptions({});
        }
        // setDependentDropdownOptions({})
    };


    // Function for getting node id of a selected machine 

    useEffect(() =>
    {

        setLoading(false);
        const selectednodeid = () =>
        {

            nodedata.map((machine) =>
            {
                console.log(selectedMachine);
                if (machine.Machine_Name === selectedMachine)
                {
                    setNodeid(machine.node_id);
                    setMachineid(machine.Machine_id);

                }
            })
        }
        if (selectedMachine !== null)
        {
            selectednodeid();
            setLoading(true);

        }
    }, [nodedata, selectedMachine])



    // Function for getting machine list based on last selected Node Id
    const handleGetMachines = () =>
    {

        // setEnable(true)
        console.log(lastSelectednode);
        setButtonState('Reset');
        client.get("/Machines_List/", {

            params: {
                node_id: lastSelectednode
            },
            withCredentials: true
        }).then((resp) =>
        {
            // console.log(JSON.stringify(resp.data));
            setNodedata(resp.data.machines);
            setMachineListData(resp.data["machines"]);
            // Assuming the API response has a structure like:
            // { machines: [{ model_number: 123, name: "Machine A" }, ...] }
            const modelNumbers = resp.data["machines"].map(machine => machine.Model_No);
            const machineNames = resp.data["machines"].map(machine => machine.Machine_Name);

            setmodels(modelNumbers);
            setMachines(machineNames);

            // setMachines(arr)
            setMachineDropdownstatus(true);

        }).catch((error) =>
        {
            console.error("Error fetching machines:", error);
            // Handle error, e.g., display an error message to the user
        });

    }

    // Funtion for clearing details on screen to enter new details.
    const resetButton = () =>
    {
        setSelectedValues({});
        setEnable(true);
        setButtonState("Get Machines");
        setMachineDropdownstatus(false);
        setDependentDropdownOptions({});
        setSelectedMachine(null);
        setNodeid("")
        setMachineid("")
        // reset()
    };



    // All tabs data in  format

    const allTabs = [{ id: 5, value: "details", tabname: "Details" },
    { id: 6, value: "kpi", tabname: "KPI" },
    { id: 7, value: "iostatus", tabname: "Status" },
    { id: 8, value: "control", tabname: "Control" }
    ]

    // Function for filtering the tabs based on the user response

    const newTabs = []
    allTabs.map((obj =>
    {
        if (tabs.includes(obj.id))
        {
            return newTabs.push(obj);
        }
    }))

    return (



        // Machine conatainer

        <Container fluid ml={10} mt={"0.3rem"} >

            {/* Dropdown box */}
            <Box mt={20} p={'1rem'} pt={0}>


                {/* Machine module dropdowns */}
                <div >


                    <SimpleGrid cols={6} gap={"md "}>
                        {uniqueDropdownArr.map((type, index) =>
                        {

                            const options = dependentDropdownOptions[type] || [...new Set(data.filter(item => item.type === type).map(item => item.node))];
                            console.log("options  " + options);

                            return <Select
                                key={index}
                                allowDeselect
                                label={type}
                                searchable
                                clearable
                                data={options}
                                value={selectedValues[type]}
                                onChange={(value) => handleDropdownChange(type, value)}
                                nothingFound="No options"
                            />
                        })}


                        <Button mt={"1.5rem"} type='submit'
                            onClick={buttonState === "Get Machines" ? handleGetMachines : resetButton}
                            disabled={enable ? true : false}
                        >{buttonState}</Button>
                    </SimpleGrid>




                </div>

                {/* Machies Dropdown */}

                {
                    machineDropdownstatus === true ? (

                        <Group mt={20}>
                            <SelectDropdown label="Model number"
                                placeholder='Select options'
                                searchable
                                clearable
                                nothingFound="No options"
                                data={models}
                                value={selectedModel}
                                onChange={(value => setSelectedModel(value))}
                            />
                            <SelectDropdown
                                label="Machines"
                                placeholder='Select options'
                                searchable
                                clearable
                                nothingFound="No options"
                                data={selectedModel === null ? machines : machine}
                                value={selectedMachine}
                                onChange={(value => setSelectedMachine(value))}
                            // onChange={(value => handleSelectedMachine(value))}
                            />

                        </Group>

                    ) : (null)
                }
            </Box>

            {/*  Tabs container Details, KPI, Status, Control */}
            <Box mt={10}>
                {selectedMachine !== null ?
                    <Tabs defaultValue={allTabs[0].value}  >
                        <div ref={divref} style={{ backgroundColor: 'var(--color-bg)' }}>

                            {fullScreen && <Text fw={600} fz={"xl"} m={"1rem"} mt={"lg"}> Machine: {selectedMachine}</Text>}
                            <Tabs.List style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                                <Group>
                                    {
                                        newTabs.length > 0 ? newTabs.map((tab) => <Tabs.Tab value={tab.value}>{tab.tabname}</Tabs.Tab>) : <LoaderComponent />
                                    }
                                </Group>

                                {/* Full size screen button */}

                                <ActionIcon onClick={handleFullScreen} right={"2rem"}><MdFullscreen size={"2rem"} /></ActionIcon>


                            </Tabs.List>
                            <Suspense fallback={<LoaderComponent />}>
                                <Card width={'100%'} h={'100%'} className='card'>
                                    {/* Details  */}
                                    <Tabs.Panel value="details" pt="xs" >
                                        <DetailsMachines nodeid={nodeid} machineid={machineid} />
                                    </Tabs.Panel>
                                    {/* KPI */}
                                    <Tabs.Panel value="kpi" pt="xs" >
                                        <KpiMachines nodeid={nodeid} machineid={machineid} screensize={fullScreen} />
                                    </Tabs.Panel>
                                    {/* Status */}
                                    <Tabs.Panel value="iostatus" pt="xs" >

                                        <StatusMachines nodeid={nodeid} machineid={machineid} />
                                    </Tabs.Panel>
                                    {/* Control */}
                                    <Tabs.Panel value="control" pt="xs" >
                                        <ControlMachines nodeid={nodeid} machineid={machineid} />
                                    </Tabs.Panel>
                                </Card>
                            </Suspense>
                        </div>
                    </Tabs> : null
                }
            </Box >

        </Container >

    );
};

export default MachinePage;