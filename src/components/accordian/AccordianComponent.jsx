import { Accordion, SimpleGrid, Title } from '@mantine/core'
import React, { useState } from 'react'
import DigitalDataCard from '../cards/DigitalDataCard'
import AnalogDataCard from '../cards/AnalogDataCard'

const AccordianComponent = (props) =>
{
    const { data } = props

    // Setting the state of accordian 
    const [value, setValue] = useState([] || "item-1");

    // function for replacing keys _ to " " starts here
    function formatString(text)
    {
        // Replace underscores with spaces
        formattedText = text.replace("_", " ");

        // Capitalize the first letter, then any letters after spaces
        return formattedText.replace(/\b\w/g, char => char.toUpperCase());
    }
    var formattedText

    // function for replacing keys _ to " " ends here


    return (
        <div>
            {/* Accordian component starts here */}
            <Accordion value={value} onChange={setValue} variant="contained" bg={'var(--color-white)'} >
                {/* Data is mapped here for no of accodian items to be generated starts here */}
                {Object.entries(data).map(([key, value]) => (

                    value.length > 0 ? <Accordion.Item key={key} value={key}>
                        {/* Titl of accordian */}
                        <Accordion.Control> <Title fw={500} fz={16} p={'0.5rem'} ml={'0rem'} color='var(--color-bold-text)'>{formattedText = formatString(key)}</Title></Accordion.Control>

                        <Accordion.Panel>
                            <div style={{ height: '100%', width: 'auto', backgroundColor: 'var(--color-white)', borderRadius: '0.5rem', }}>
                                <SimpleGrid cols={5} h={'100%'} p={'1rem'} >
                                    {/* digital cards and analog cards are mapped here */}

                                    {(key === "digital_input" || key === "digital_output") ? value.map((card) => (
                                        // DigitalDataCard Component
                                        <DigitalDataCard key={card.name} data={card} />
                                    )) :
                                        value.map((card) => (
                                            // AnalogDataCard Component
                                            <AnalogDataCard key={card.name} data={card} />
                                        ))

                                    }
                                    {/* digital cards and analog cards are mapped here */}
                                </SimpleGrid>
                            </div>

                        </Accordion.Panel>

                    </Accordion.Item> : null
                ))

                }
                {/* Data is mapped here for no of accodian items to be generated starts here */}
            </Accordion>
            {/* Accordian component ends here */}

        </div>
    )
}

export default AccordianComponent
