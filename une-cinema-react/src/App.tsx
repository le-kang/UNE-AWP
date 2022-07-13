import { Header } from './components'
import { Home } from './pages'

import style from './App.module.css'

function App() {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Home />
      </main>
    </>
  )
}

export default App
