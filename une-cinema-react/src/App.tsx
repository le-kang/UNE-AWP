import { Header } from './components'
import { Home, Login } from './pages'

import style from './App.module.css'

function App() {
  return (
    <>
      <Header />
      <main className={style.main}>
        {/* <Home /> */}
        <Login />
      </main>
    </>
  )
}

export default App
