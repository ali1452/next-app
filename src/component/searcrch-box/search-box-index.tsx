"use client"

import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import styles from './search-box.module.scss'
import { getAllProducts } from '@/services/userservices';
import Link from 'next/link';


type Props = {}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const SearchBox = (props: Props) => {
    const [product,setProduct] = useState([])
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });

      const [search, setSearch] =useState('')
      const [selectedProduct,setSelectedProduct] = useState([])
      const [isLoading,setIsloading] = useState(true)

      const fetchProduct = async()=>{
        const res = await getAllProducts()
        if(res?.status == 200){
            setProduct(res.data)
            setIsloading(false)

        }
       
      }

      useEffect(()=>{
        fetchProduct()
      },[])

      const toggleDrawer = (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setSearch('')
        setSelectedProduct([])
        setState({ ...state, [anchor]: open });
      };

      const searchProduct =(e: React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
        const key_words = (e.target.value).toLowerCase()
        if(key_words !==""){
          const  selectedItems = product.filter((item:any)=>{
            if(item.name.toLowerCase().includes(key_words)){
              return item
  
            }
          })
          setSelectedProduct(selectedItems)
  
        }else{
          setSelectedProduct([])
        }
        
      }
  
    const list = (anchor: Anchor,styles: { readonly [x: string]: string; search_input?: any; }) => (
      <div
        role="presentation"
        className={styles.list_container}
      >
        <>
        <p className={styles.search_wrap}>
          <input placeholder='Search Product' value={search} className={styles.search_input} type='text' onChange={(e)=>searchProduct(e)} />
        </p>
        {selectedProduct.length > 0 && <p className={styles.search_text}>{`Total search product ${selectedProduct.length}`}</p>}
        <div className={styles.prouduct_wrap}>
          {selectedProduct.map((item:any, index:number) => {
            return(
            <div key={index+"search"} style={{maxWidth:'48%'}}>
            <Link href={`/products/${item.product_id}`} onClick={()=>setState({...state,top:false})}>
            <div className={styles.detail} >
              <p>
                <img src={`../${item.url}`} alt='image' />
              </p>
              <p>{item.name}</p>
            </div>
            </Link>
            </div>
            )
            
            })}
        </div>
        </>
      </div>
    );

    if(isLoading){
      return null
    }
  
  return (
<div className={styles.search_container}>

          {(['top'] as const).map((anchor) => (
            
        <React.Fragment key={anchor}>
          <Button className={styles.btn} onClick={toggleDrawer(anchor, !state.top)}>{<SearchIcon />}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor,styles)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}

export default SearchBox