import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from "./components/Header.jsx";
import ProductList from "./components/ProductList.jsx";
import Form from "./components/Form.jsx";

function App() {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<ProductList />}/>
                    <Route path={'/form'} element={<Form />}/>
                    <Route path={'*'} element={<ProductList />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
