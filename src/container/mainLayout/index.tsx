'use client'

import React from 'react'
import  style from './mainLayout.module.scss'

const MainLayout = ({data}:any) => {
 
 console.log('data',1)
    
  return (
    <div className={style.main_layout_container}>
        <h1>Client List</h1>
        {data && data.map((item:any)=>{
            return(
                <p onClick={()=>console.log('hello')} className={style.customer_name} key={item._id}>{item.first_name} {item.last_name}</p>
            )
        })}
    </div>
  )
}

export default MainLayout