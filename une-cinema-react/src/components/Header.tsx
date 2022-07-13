import style from './Header.module.css'

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <span>UNE Cinema</span>
        <div className={style.actions}>
          <button className={style.action}>Login</button>
        </div>
      </div>
    </header>
  )
}
