import React from 'react'
import style from './Button.module.css'

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button className={style.button} {...props} />
}
