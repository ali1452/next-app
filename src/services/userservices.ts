import axios from "axios"
import Gconfig  from "@/globalConfig"

const base_url = Gconfig.api_url

const getAllProducts = async()=>{
    try {
        const products = await axios.get(`${base_url}/products`)
        return products    
    } catch (error) {
        console.log(error)
    }
    
}

const getProduct = async(id:any)=>{
    try {
        const product = await axios.get(`${base_url}/products/${id}`)
        return product
        
    } catch (error) {
        console.log(error)
    }
    
}

const getAllOrders = async () => {
    try {
        const res = await axios.get(`${base_url}/orders`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const postOrder = async (orderData:any) => {
    try {
        const res = await axios.post(`${base_url}/orders`, orderData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res.data    
    } catch (error) {
        console.error('Error posting order:', error)
        throw error
    }
}



export { getAllProducts,getProduct,getAllOrders,postOrder }