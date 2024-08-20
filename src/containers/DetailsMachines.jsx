import React, { useEffect, useState } from 'react'
import client from '../API/API';
import { Card, Container, Grid, } from '@mantine/core';
import LoaderComponent from '../components/loader/LoaderComponent';
import ManualsAndDocs from '../components/GeneralMachineDetails/ManualsAndDocs';
import TechnicalDetails from '../components/GeneralMachineDetails/TechnicalDetails';
import GeneralDetails from '../components/GeneralMachineDetails/GeneralDetails';

const DetailsMachines = (props) =>
{

    const { nodeid } = props

    const [machineData, setMachineData] = useState({});

    // Function for getting machines general details starts here
    useEffect(() =>
    {
        setMachineData({})
        if (nodeid !== "")
        {

            const generalDetails = () =>
            {

                client.get("/Machines_sub_details/", {
                    params: {
                        node_id: nodeid,
                        // module: "Details"
                        module: "5"
                    },
                    withCredentials: true
                }).then((resp) => (

                    setMachineData(resp.data)


                )).catch((error) => console.log("error", error))
            }
            generalDetails()
        }

    }, [nodeid])
    // Function for getting machines general details ends here


    return (
        // General Details COmponent starts here

        <Container fluid p={0} pb={16}>

            {Object.entries(machineData).length > 0 ?

                <Grid>

                    {Object.entries(machineData).map(([key, value]) =>
                    {
                        //   General details Card starts here 
                        if (key === "general_details")
                        {
                            return <Grid.Col span={4}>
                                <GeneralDetails value={value} />
                            </Grid.Col>
                        }
                        //   General details Card ends here

                        //   Manuals_and_Docs Card starts here 
                        if (key === "Manuals_and_Docs" && value.length > 0)
                        {
                            return <Grid.Col span={8}> <ManualsAndDocs value={value} />
                            </Grid.Col>
                        }
                        //   Manuals_and_Docs Card ends here 

                        //   Techincal_Details Card starts here 
                        if (key === "Techincal_Details_data" && value.length > 0)
                        {
                            return <Grid.Col> <Card
                                shadow="sm"
                                component="a"
                                // height:22.2rem
                                className='subCard' style={{ height: 'inherit', padding: '0rem', backgroundColor: 'transparent' }}>

                                <TechnicalDetails data={value} />

                            </Card>
                            </Grid.Col>

                        }
                        //   Techincal_Details Card ends here 

                    }
                    )}
                </Grid>

                : <LoaderComponent />

            }

        </Container>
        // General Details Component ends here


    )
}

export default DetailsMachines