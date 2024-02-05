import React from 'react';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Info from "./Components/Main/Info";
function App() {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/info" element={<Info />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
