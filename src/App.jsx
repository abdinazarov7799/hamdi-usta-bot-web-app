import './App.css'
const tg = window.Telegram.WebApp;
function App() {
  return (
    <>
        <p>initData: {tg?.initData}</p>
        <p>colorScheme: {tg?.colorScheme}</p>
        <p>headerColor: {tg?.headerColor}</p>
        <p>viewportHeight: {tg?.viewportHeight}</p>
        <p>viewportStableHeight: {tg?.viewportStableHeight}</p>
        <p>platform: {tg?.platform}</p>
    </>
  )
}

export default App
