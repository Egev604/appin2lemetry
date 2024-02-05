import React from 'react';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";

function App() {
    return (
        <div>
            <header>
                <Header/>
            </header>
            <main>
                <Main/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default App;
