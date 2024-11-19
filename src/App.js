import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Provider store={store}>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    </Routes>
                </Router>
            </GoogleOAuthProvider>
        </Provider>
    );
};

export default App;