
import React from 'react'
import { Button } from '@mantine/core'

const ButtonComponent = (props) =>
{
  const { mt, ml, w, onClick, disabled, loading } = props
  return (
    <div>
      <Button mt={mt} w={w} ml={ml} color='var(--color-onclick)' disabled={disabled} onClick={onClick} loading={loading}>
        Search
      </Button>
    </div>
  )
}

export default ButtonComponent
