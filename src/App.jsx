import './App.css'
import {useEffect} from "react";
const tg = window.Telegram.WebApp;
function App() {
    useEffect(() => {
        tg.ready();
    },[])
  return (
    <>
        <p>initData: {tg?.initData}</p>
        <p>colorScheme: {tg?.colorScheme}</p>
        <p>headerColor: {tg?.headerColor}</p>
        <p>viewportHeight: {tg?.viewportHeight}</p>
        <p>viewportStableHeight: {tg?.viewportStableHeight}</p>
        <p>platform: {tg?.platform}</p>
        <p>initDataUnsafe: {tg?.initDataUnsafe.user}</p>
    </>
  )
}

export default App
