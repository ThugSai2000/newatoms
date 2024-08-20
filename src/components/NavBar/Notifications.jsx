import { Badge, Container } from '@mantine/core'
import React from 'react'
import { IoIosNotifications } from 'react-icons/io'

const Notifications = () =>
{
    const notificationsCount = 5
    return (
        <Container>

            <IoIosNotifications color='var(--color-icon)' size="2.5rem" />
            {/* {notificationsCount > 0 && (
                <Badge
                    color="red"
                    style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-8px',
                    }}
                >
                    {notificationsCount}
                </Badge>
            )} */}


        </Container>
    )
}

export default Notifications
