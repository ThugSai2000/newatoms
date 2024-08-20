import { Loader } from '@mantine/core'
import React from 'react'

const LoaderComponent = () =>
{
    return (
        <div style={{ width: 'inherit', height: 'inherit', display: 'grid', placeItems: 'center', padding: '50px', fontSize: '34px' }}>
            <Loader />
        </div>
    )
}

export default LoaderComponent
