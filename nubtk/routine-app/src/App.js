import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Filter from './pages/Filter';
import Settings from './pages/Settings';

import StudentSignup from './pages/StudentSignup';
import TeacherSignup from './pages/TeacherSignup';

import Notification from './pages/settings/Notification';
import Help from './pages/settings/Help';
import Developer from './pages/settings/Developer';
import Network from './pages/settings/Network';
import Profile from './pages/settings/Profile';
import InternetConnection from './components/InternetConnection';

function App() {
    return (
        <>
            <InternetConnection />
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path='/filter' element={<Filter/>}/>
                    <Route path='/settings' element={<Settings/>}/>

                    <Route path='/student-signup' element={<StudentSignup/>}/>
                    <Route path='/teacher-signup' element={<TeacherSignup/>}/>

                    <Route path='/settings/notification' element={<Notification/>}/>
                    <Route path='/settings/help' element={<Help/>}/>
                    <Route path='/settings/network' element={<Network/>}/>
                    <Route path='/settings/developer' element={<Developer/>}/>
                    <Route path='/settings/profile' element={<Profile/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
