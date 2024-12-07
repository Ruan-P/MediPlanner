import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import SetMedicine from "./components/MedicineComp/functions/setMedicine";
import RemoveMedicine from "./components/MedicineComp/functions/removeMedicine";
import StatusMedicineOld from "./components/MedicineComp/functions/statusMedicine(old)";
import Top_bar from "./components/topbar";
import MyPage from "./components/MyPage/MyPage";
import TakeMedicine from "./components/MedicineComp/takeMedicine";

const App = () => {
    return (
        <Provider store={store}>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <Router>
                    <Top_bar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                        <Route path="/med/add" element={<SetMedicine />}/>
                        <Route path="/med/remove" element={<RemoveMedicine />}/>
                        <Route path="/med/status" element={<StatusMedicineOld />}/>
                        <Route path="/myPage" element={<MyPage/>}/>
                        <Route path="/med/mypage" element={<TakeMedicine />}/>
                    </Routes>
                </Router>
            </GoogleOAuthProvider>
        </Provider>
    );
};

export default App;