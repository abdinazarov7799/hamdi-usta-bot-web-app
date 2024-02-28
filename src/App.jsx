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
        <p>initDataUnsafe: {tg?.initDataUnsafe?.user?.id}</p>
        <p>initDataUnsafe: {tg?.initDataUnsafe?.user?.username}</p>
        <p>initDataUnsafe: {tg?.initDataUnsafe?.user?.first_name}</p>
        <p>initDataUnsafe: {tg?.initDataUnsafe?.user?.last_name}</p>
        <img src={tg?.initDataUnSafe?.user?.photo_url} alt=""/>
    </>
  )
}

export default App
