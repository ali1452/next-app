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

      const fetchProduct = async()=>{
        const res = await getAllProducts()
        if(res?.status == 200){
            setProduct(res.data)
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
  
        setState({ ...state, [anchor]: open });
      };

      const searchProduct =(e: { target: { value: React.SetStateAction<string>; }; })=>{
        setSearch(e.target.value)
        const key_words = e.target.value
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
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        style={{marginTop:'4%'}}
      >
        <>
        <p style={{margin:'10px'}}>
          <input  value={search} className={styles.search_input} type='text' onChange={(e)=>searchProduct(e)} />
        </p>
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
          {selectedProduct.map((item:any, index:number) => {
            return(
            <Link key={index+"search"} href={`/products/${item.product_id}`} onClick={()=>setState({...state,top:false})}>
            <div  style={{padding:'10px'}}>
              <p>
                <img src={`../${item.url}`} alt='image' />
              </p>
              <p>{item.name}</p>
            </div>
            </Link>
            )
            
            })}
        </div>
        </>
      </div>
    );
  
  return (
    <>
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
    </>
  )
}

export default SearchBox