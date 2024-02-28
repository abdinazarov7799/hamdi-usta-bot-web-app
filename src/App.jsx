import './App.css'
import {useEffect} from "react";
const tg = window.Telegram.WebApp;
function App() {
    useEffect(() => {
        tg.ready();
    },[])
    console.log(tg)
  return (
    <>

    </>
  )
}

export default App
