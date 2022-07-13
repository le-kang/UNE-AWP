import { Header } from './components'
import { Home, Login, SignUp } from './pages'

import style from './App.module.css'

function App() {
  return (
    <>
      <Header />
      <main className={style.main}>
        <Home />
        {/* <Login /> */}
        {/* <SignUp /> */}
      </main>
    </>
  )
}

export default App
