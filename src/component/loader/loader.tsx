import React from 'react'
import style from './loader.module.scss'

type Props = {}

function Loader({}: Props) {
  return (
    <div className={style.loader_container}>
        <img src="./loaderImg.gif" alt="loading" />
    </div>
  )
}

export default Loader