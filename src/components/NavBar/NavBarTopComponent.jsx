import React from 'react';
import { Container, Input, Tooltip, Group, Box, Image } from '@mantine/core';
import { AiOutlineSearch } from 'react-icons/ai';
import Notifications from './Notifications';
import Logout from './Logout';
import AtomsLogo from "./../../assets/AtomsLogo.png"
import { Link } from 'react-router-dom';

// import './CSS/navbarTop.css';

const NarBarTopComponent = () =>
{

  return (
    <Container size="lg">

      <div style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
        <div id="navCompanyLogo" >
          <Group position='left'>
            <Link to={'/app/dashboard'} replace>
              <Image
                width={'5.5rem'}
                ml={56}
                mt={8}
                src={window.localStorage.logourl}
                alt="Atoms Logo"
              />
            </Link>
          </Group>
        </div>
        <Group position='right' style={{ margin: '0', alignItems: 'center' }}>
          {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
          {/* <Input
            id="navtop_search"
            placeholder="Search..."
            rightSection={

              <AiOutlineSearch

                size="1rem"
                id="icon_search"
                style={{ opacity: 0.5, marginTop: '11px' }} />

            }
          /> */}
          {/* <Box mt={7} >
            <Notifications />
          </Box> */}
          <Box mt={7}>
            <Logout />
          </Box>
          {/* </div> */}
        </Group>
      </div>
    </Container>
  );
};

export default NarBarTopComponent;
