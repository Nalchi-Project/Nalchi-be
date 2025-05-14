import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OAuthRedirectHandler from "./handler/OAuthRedirectHandler";
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Main from './components/Main';
import DiaryPage from './pages/DiaryPage';
import NewDiaryPage from './pages/NewDiaryPage';
import EditDiaryPage from './pages/EditDiaryPage';
import DiaryDetailPage from './pages/DiaryDetailPage';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/main" element={<Main />} />
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/diary/new" element={<NewDiaryPage />} />
                <Route path="/diary/edit/:id" element={<EditDiaryPage />} />
                <Route path="/diary/:id" element={<DiaryDetailPage />} />
                <Route path="/oauth2/redirect" element={<OAuthRedirectHandler />} />
            </Routes>
        </Router>
    );
};

export default App;