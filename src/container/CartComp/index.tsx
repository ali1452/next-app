'use client'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import style from './cart.module.scss'
import { useRouter } from 'next/navigation';
import DeleteModal from './deleteModal/deleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, deleteAllCart,cartItemAdded, addItemQty } from '@/redux/slice/cartSlice';
import Loader from '@/component/loader/loader';


type Props = {}
type cartDataType ={
  name: string;
    price: string; 
    category: string; 
    brand: string; 
    description: string; 
    url: string; 
    discount_price: string; 
    sku: string; 
    size: string;
    qty: number;
    edit:boolean;
    product_id:string
  
}

const CartComp = (props: Props) => {
  const [product,setProduct] = useState<cartDataType[] | null>(null)
  const [discountCode, setDiscountCode] = useState<string>('')
  const [applyCode, setApplyCode] = useState<boolean>(false)
  const [codeAmt, setCodeAmt] = useState<number>(0)
  const [errMsg, setErrMsg] = useState('')
  const [modal,setModal] = useState<boolean>(false)
  const [loading, setLoading] =useState<boolean>(true)
  const route = useRouter()

  const dispatch=useDispatch()
  const cart:any = useSelector(item=>item)
  const cartData = cart.cart.cart

  const fetchCartData=()=>{
    setProduct(cartData)
    setLoading(false)
  }
  
  
    useEffect(()=>{
      fetchCartData()
    },[])

   
    const changeQty=(e: number, index:number)=>{
      if(product !== null){
        const temp_element = JSON.parse(JSON.stringify(product))
      let str  = e.toString()
      if((str).toString().length >1){
        const select_qty = +str.charAt(1)
        if(select_qty > 0 && select_qty  <= 5){
          temp_element[index].qty = select_qty
          setProduct(temp_element)
          dispatch(cartItemAdded(temp_element))
        }
        }else{
          if(e >0 && e <= 5 ){
            temp_element[index].qty = +e
            setProduct(temp_element)
            dispatch(cartItemAdded(temp_element))
          }
      }
      }
      
    }

    const subTotalAmt = ()=>{
      let amount = 0
      if(product !== null){
        product.forEach((item:any)=>amount += +item.price*item.qty)
        return  amount
      }else{
        return 0
      }
    }

    const applyDiscount=()=>{
      if(discountCode === "welcome"){
        setApplyCode(true)
        setCodeAmt(200)
      }else{
        setErrMsg('This code is invalid!')
        setTimeout(()=>{
          setErrMsg('')
        },2000)
      }

    }
    const editItems =(index:number)=>{
      if(product !== null){
        const  tempData = JSON.parse(JSON.stringify(product))
        tempData[index].edit = true
        setProduct(tempData)
      }
    }

    const saveItems =(index:number)=>{
      if(product !== null){
        const  tempData = JSON.parse(JSON.stringify(product))
        tempData[index].edit = false
        setProduct(tempData)
      }
    }

    const changeSkuSize =(e: React.ChangeEvent<HTMLSelectElement>,index:number)=>{
      if(product !== null){
        let addedItem  = true
        const optedSize = e.target.value
        const temp_product = [...product]
        temp_product.filter((item,i)=>{
          if((item.product_id == temp_product[index].product_id) && (item.size == optedSize)){
            addedItem = false
            temp_product.splice(index,1)
            item.qty += 1 
          }
        })
        if(!addedItem){
          setProduct(temp_product)
          dispatch(cartItemAdded(temp_product))
        }else{
          temp_product[index].size = optedSize
          setProduct(temp_product)
        }
        
      }
    }

    const chekout =()=>{
      setLoading(true)
      route.push('/checkout')
    }

  return (
  <div className={style.cart_main_container}>
    {loading && <Loader  /> }
    
   {!loading && <div className={style.cart_container} >
     
      {product && product.length > 0  ?
      <>
      <div className={style.detail_container}>
        <p className={style.cart_heading}>Shopping Cart</p>
      <table>
       <thead>
       <tr style={{borderBottom:'1px solid #000', marginBottom:'10px'}}>
       <th>ITEM</th>
       <th>PRICE</th>
       <th>QTY</th>
       <th>SUBTOTAL</th>
       </tr>
       </thead>
     <tbody>
      {product.map((item, index)=>{
        return (
<tr  key={index+1}>
     <td className={style.item_container}>
      <div>
      
      <p style={{width:'120px'}}><img src={`https://res.cloudinary.com/dpnza2tuy/image/upload/v1717048876/${item.url}`} /></p>
      </div>
      <div className={style.detail_box}>
      <p className={style.bold_text}>{item.name}</p>
      {!item.edit ?<p><span className={style.bold_text}>Size:</span><span style={{textTransform:'uppercase'}}>{item.size}</span></p>:
      <p>
         <select value={item.size} className={style.select_input}  name="size" id="size" onChange={(e)=>changeSkuSize(e,index)}>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
         </select>
        </p>}
    {!item.edit ? <p><span className={style.bold_text}>Quantity:</span>{item.qty}</p>:
      <>
      <label>QTY</label>
      <p><input className={style.select_input} value={item.qty}  type="number" onChange={(e)=>changeQty(+e.target.value,  index)}  /></p>
      </>}
      {!item.edit && <p onClick={()=>editItems(index)} className={style.edit_btn}>edit</p>}
      {item.edit && <p onClick={()=>{saveItems(index)}} className={style.edit_btn}>Save</p>}
      </div>
      </td>
     <td className={style.price}>
      <span>{item.price}</span>
      </td>
     <td className={style.qty}>{item.qty}</td>
     <td className={style.sub_total}>{+item.price*item.qty}</td>
     </tr>
        )
      })}
     
     </tbody>
   </table>
   <div className={style.icons_btn}>
     <p><CreateIcon /></p>
     <p onClick={()=>{setModal(true)}} ><DeleteIcon /></p>
     </div>
     <div className={style.share_box}>
      <p className={style.share_btn}>share cart</p>
      <p className={style.continue_btn} onClick={()=>route.push('/')}>continue Shopping</p>
     </div>
     <div className={style.discount_box}>
    <p className={style.discount_heading}>Apply discount code</p>
    {<p style={{color:'red'}}>{errMsg}</p>}
    <input disabled={applyCode} className={style.code_input} onChange={(e)=>setDiscountCode((e.target.value.trim().toLowerCase()))} type='text' placeholder='promo code' />
    <button disabled={applyCode}  className={style.code_btn} onClick={()=>applyDiscount()} >Apply Discount</button>
   </div>
   </div>
  <div className={style.summary_box}>
  <p className={style.summary_heading}>Summary</p>
  <div className={style.flex_box}>
    <p>subtotal</p>
    <p>Rs.{subTotalAmt()}</p>
  </div>
  <div className={style.flex_box}>
    <p>shipping (domestic - shipping)</p>
    <p>Rs.100</p>
  </div>
  {applyCode? <div className={style.flex_box}>
    <p>Promo Code</p>
    <p>Rs.{codeAmt}</p>
  </div>:''}
  <div className={style.total_box}>
    <p>Order Total</p>
    <p>{subTotalAmt() !==0?<>Rs.{subTotalAmt() - codeAmt +  100}</>:0.00}</p>
  </div>
  <p className={style.checkout_btn} onClick={()=>chekout()}>go to checkout</p>
  </div>
  <DeleteModal modal={modal} setModal={(modal:boolean)=>setModal(modal)} setProduct={(item:any)=>setProduct(item)} />
  </>
      :<p className={style.empty_cart}>Cart is Empty</p>}
      
    </div>}
    </div>
  )
}

export default CartComp