import React, { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import ReportPage from './pages/ReportPage';
import MachinePage from './pages/MachinePage';
import TrailPage from './pages/TrailPage';
import DashBoardPage from './pages/DashBoardPage';
import PageNotFound404 from './pages/PageNotFound404';
import LoginPage from './pages/LoginPage';
import SubMachine from './pages/SubMachine';
import About from './components/About/About';
import MainLayout from './Layout/MainLayout';
import LoaderComponent from './components/loader/LoaderComponent';

// const ReportPage = lazy(()=> import('./pages/ReportPage'));
// const MachinePage = lazy(()=> import('./pages/MachinePage'));
// const TrailPage = lazy(()=> import('./pages/TrailPage'));
// const DashBoardPage = lazy(()=> import('./pages/DashBoardPage'));
// const PageNotFound404 = lazy(()=> import('./pages/PageNotFound404'));
// // const LoginPage = lazy(()=> import('./pages/LoginPage'));
// const SubMachine = lazy(()=> import('./pages/SubMachine'))
// // const MainLayout = lazy(()=> import('./Layout/MainLayout'))
// const About = lazy(()=> import('./components/About/About'))


// Function for Private route authentication

const PrivateRoutes = () =>
  {
    const userToken = localStorage.getItem("username")

    // console.log("private route : " + z)
  // verifying whether the user has token or not userToken is the token

    let auth = { "token": userToken !== null || undefined ? true : false }
    return (
      auth.token ? <MainLayout /> : <Navigate to="/login" />
    )
  }

  
function App() {

//  Manthine theme for setting  light or daek mode 
// The css of each component is in their respective css files and also index.css and app.css
 
  const [colorScheme, setColorScheme] = useState('light')

  // function to set light or dark mode of the application
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>

    {/* Recoil root is the global store */}
      <RecoilRoot>
        <Router>
          <Routes>
              {/* About page */}
              <Route exact path='/about' element={ <Suspense fallback={<LoaderComponent/>}><About/></Suspense>} />
              <Route exact path='/login' element={ <LoginPage/>}/>

              {/* Autheticated routes or private routs of the application */}
              <Route exact path='/app' element={<PrivateRoutes/>}>
                <Route exact path='dashboard'  element={<Suspense fallback={<LoaderComponent/>}><DashBoardPage /></Suspense>  } />
                <Route exact path='machine' element={<Suspense fallback={<LoaderComponent/>}><MachinePage /></Suspense>  }/> 
                <Route exact path='trail' element={  <Suspense fallback={<LoaderComponent/>}><TrailPage /> </Suspense>} />
                <Route exact path='report' element={ <Suspense fallback={<LoaderComponent/>}><ReportPage /></Suspense>} />
                <Route exact path='submachine/:machine/:nodeid/:machineid' element={ <Suspense fallback={<LoaderComponent/>}><SubMachine/></Suspense>} />
                {/* <Route exact path='settings' element={ <SettingsPage />} /> */}
              </Route>  

              {/* Autheticating route if user credential is there or the token haven't expired  user will automaticallly redirect to dashboard page*/}
              <Route exact path='/' element={ window.localStorage.getItem('username') !== undefined  ? <Navigate to={'/app/dashboard'}/> : <Navigate to='/login'/>} /> 

            {/* Page Not Found component */}
              <Route path='*' element={<Suspense fallback={<LoaderComponent/>}><PageNotFound404/></Suspense>}/>  
          </Routes>
          {/* </Suspense> */}
        </Router>
      </RecoilRoot>
    </MantineProvider>
    </ColorSchemeProvider>
      
  );
}

export default App;

