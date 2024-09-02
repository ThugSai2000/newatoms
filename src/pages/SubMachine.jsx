import { ActionIcon, Box, Card, Container, Group, Space, Tabs, Title } from '@mantine/core';
import { Text } from '@react-pdf/renderer';
import React, { useEffect, useRef, useState } from 'react'
import LoaderComponent from '../components/loader/LoaderComponent';
import { MdFullscreen } from 'react-icons/md';
import DetailsMachines from '../containers/DetailsMachines';
import KpiMachines from '../containers/KpiMachines';
import StatusMachines from '../containers/StatusMachines';
import ControlMachines from '../containers/ControlMachines';

import { useNavigate, useParams } from 'react-router-dom';
import client from '../API/API';


const SubMachine = () =>
{

    const [tabs, setTabs] = useState([])
    const [fullScreen, setFullscreen] = useState(false)
    const navigate = useNavigate();

    const params = useParams();
    // console.log(typeof params.nodeid);

    const divref = useRef(null)

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
                // console.log(resp.data.status);
                if (resp.data.status === "login_required")
                {
                    window.localStorage.clear()
                    window.location.reload()
                    navigate('/login')
                    // setError(`Got error while connecting with status ${response.status}`)
                } else
                {

                    setTabs(resp.data.sub_pages)
                }



            }).catch((error) =>
            {
                console.error("Error fetching machines:", error);
                // Handle error, e.g., display an error message to the user
            });
    }, [navigate])


    const allTabs = [{ id: 5, value: "details", tabname: "Details" },
    { id: 6, value: "kpi", tabname: "KPI" },
    { id: 7, value: "iostatus", tabname: "Status" },
    { id: 8, value: "control", tabname: "Control" }
    ]

    const newTabs = []
    allTabs.map((obj =>
    {
        if (tabs.includes(obj.id))
        {
            return newTabs.push(obj)
        }
    }))



    return (

        <Container fluid ml={10}  >





            <Box mt={10} p={'1rem'}>
                {tabs.length !== 0 ?
                    <Tabs defaultValue={allTabs[0].value}  >
                        <div ref={divref} style={{ backgroundColor: 'var(--color-bg)', }} >
                            {fullScreen ? <Box><Title color='var(--color-text)' ml={16} mt={16} mb={20} size={20} fw={500} display={'inline-block'}>Machine : &nbsp; </Title><Title color='var(--color-bold-text)' display={'inline-block'} size={18} fw={500}> {params.machine}</Title></Box> : null}
                            {/* {fullScreen && <Text fw={600} fz={"xl"} > Machine: {params.machine}</Text>} */}
                            <Tabs.List style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                                <Group>
                                    {
                                        newTabs.length > 0 ? newTabs.map((tab) => <Tabs.Tab value={tab.value}>{tab.tabname}</Tabs.Tab>) : <LoaderComponent />
                                        // allTabs.length > 0 ? allTabs.map((tab) => <Tabs.Tab value={tab.value}>{tab.tabname}</Tabs.Tab>) : <LoaderComponent />
                                    }
                                </Group>

                                <ActionIcon onClick={handleFullScreen} right={"2rem"}><MdFullscreen size={"2rem"} /></ActionIcon>


                            </Tabs.List>



                            {/* <ScrollArea h={fullScreen ? 760 : 400} scrollHideDelay={0} id='scrollarea' pt={10}> */}

                            <Card width={'100%'} h={'100%'} className='card'>
                                <Tabs.Panel value="details" pt="xs" >
                                    <DetailsMachines nodeid={params.nodeid} machineid={params.machineid} />
                                </Tabs.Panel>
                                <Tabs.Panel value="kpi" pt="xs" >
                                    <KpiMachines nodeid={params.nodeid} machineid={params.machineid} screensize={fullScreen} />
                                </Tabs.Panel>
                                <Tabs.Panel value="iostatus" pt="xs" >
                                    <StatusMachines nodeid={params.nodeid} machineid={params.machineid} />
                                </Tabs.Panel>
                                <Tabs.Panel value="control" pt="xs" >
                                    <ControlMachines nodeid={params.nodeid} machineid={params.machineid} />
                                </Tabs.Panel>
                            </Card>

                            {/* </ScrollArea> */}
                        </div>
                    </Tabs>
                    : null}
            </Box >

        </Container >


    )
}

export default SubMachine
