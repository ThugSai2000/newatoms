import { SegmentedControl } from '@mantine/core'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { segmentControlState } from '../../Store/store'

const SegmentControlComponent = (props) =>
{
    const [value, setValue] = useRecoilState(segmentControlState)
    const { data } = props
    // console.log("segment :" + value)
    return (
        <div>
            <SegmentedControl variant='fill' color='var(--color-onclick)'
                data={data.map((key) => key)}
                value={value}
                onChange={setValue}
            />
        </div>
    )
}

export default SegmentControlComponent
