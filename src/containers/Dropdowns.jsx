import React, { useState } from 'react'

const Dropdowns = () =>
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



    return (
        <div>

        </div>
    )
}

export default Dropdowns
