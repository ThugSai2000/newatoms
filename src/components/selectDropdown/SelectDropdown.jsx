import React, { useState } from 'react'
import { Select } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'


const SelectDropdown = (props) =>
{
    const { label, placeholder, data, selectedOption, onChange } = props
    // const [value, setValue] = useState(null)
    // console.log('select : ' + data)


    return (
        <div>
            <Select

                sx={{
                    label: {
                        fontSize: '14px',
                        color: 'var(--color-bold-text)',
                        fontWeight: '500'
                    }
                }}
                rightSection={<IconChevronDown size="1rem" />}
                rightSectionWidth={30}
                dropdownPosition='bottom'
                value={selectedOption}
                label={label}
                placeholder={placeholder}
                data={data}
                // data={['react']}
                onChange={(value) => onChange(value)}
            />
        </div>


    )
}

export default SelectDropdown
