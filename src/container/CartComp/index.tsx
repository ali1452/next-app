'use client'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import style from './cart.module.scss'
import { useRouter } from 'next/navigation';
import DeleteModal from './deleteModal/deleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, deleteAllCart } from '@/redux/slice/cartSlice';
import Loader from '@/component/loader/loader';


type Props = {}
type cartPayload ={
    name: string;
    price: string; 
    category: string; 
    brand: string; 
    description: string; 
    url: string; 
    discount_price: string; 
    sku: string; 
    qty: number;
    edit:boolean
  
}

type cartDayaType ={
  type:string;
   payload:cartPayload;
}

const CartComp = (props: Props) => {
  const [product,setProduct] = useState<cartDayaType[] | null>(null)
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
          temp_element[index].payload.qty = select_qty
          setProduct(temp_element)
          dispatch(addCart(temp_element))
        }
        }else{
          if(e >0 && e <= 5 ){
            temp_element[index].payload.qty = +e
            setProduct(temp_element)
            dispatch(addCart(temp_element))
          }
      }
      }
      
    }

    const subTotalAmt = ()=>{
      let amount = 0
      if(product !== null){
        product.forEach((item:any)=>amount += +item.payload.price*item.payload.qty)
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
        tempData[index].payload.edit = true
        setProduct(tempData)
      }
    }

    const saveItems =(index:number)=>{
      if(product !== null){
        const  tempData = JSON.parse(JSON.stringify(product))
        tempData[index].payload.edit = false
        setProduct(tempData)
      }
    }

  return (
  <>
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
      <p style={{width:'120px'}}><img src={item.payload.url} /></p>
      </div>
      <div className={style.detail_box}>
      <p className={style.bold_text}>{item.payload.name}</p>
      {!item.payload.edit ?<p><span className={style.bold_text}>Size:</span>{item.payload.sku}</p>:
      <p>
         <select className={style.select_input}  name="size" id="size">
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
         </select>
        </p>}
      {!item.payload.edit ? <p><span className={style.bold_text}>quantity:</span>{item.payload.qty}</p>:
      <>
      <label>QTY</label>
      <p><input className={style.select_input} value={item.payload.qty}  type="number" onChange={(e)=>changeQty(+e.target.value,  index)}  /></p>
      </>}
      {!item.payload.edit && <p onClick={()=>editItems(index)} className={style.edit_btn}>edit</p>}
      {item.payload.edit && <p onClick={()=>{saveItems(index)}} className={style.edit_btn}>Save</p>}
      </div>
      </td>
     <td className={style.price}>
      <span>{item.payload.price}</span>
      </td>
     <td className={style.qty}>{item.payload.qty}</td>
     <td className={style.sub_total}>{+item.payload.price*item.payload.qty}</td>
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
  <p className={style.checkout_btn}>go to checkout</p>
  </div>
  <DeleteModal modal={modal} setModal={(modal:boolean)=>setModal(modal)} setProduct={(item:any)=>setProduct(item)} />
  </>
      :<p className={style.empty_cart}>Cart is Empty</p>}
      
    </div>}
    </>
  )
}

export default CartComp