import { DatePickerInput } from '@mantine/dates'
import React from 'react'

const DatePickerInputComponent = (props) =>
{
    const { type, size, label, date, onhandleChangeDate } = props

    return (
        <DatePickerInput size={size} valueFormat="YYYY/MM/DD" value={date} label={label} placeholder='YYYY/MM/DD' onClick={(value) => onhandleChangeDate(value)} />
    )
}

export default DatePickerInputComponent
