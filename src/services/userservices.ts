import axios from "axios"
import Gconfig  from "@/globalConfig"

const bast_url = Gconfig.api_url

// const fetchAllUsers =async()=>{
//     const users = await axios.get(url)
//     return users
// }

// const createUser = async(data:any)=>{
//     const newUser = await axios.post(url,data)
//     return newUser
// }

// const deleteUser = async(id:string)=>{
//     await axios.delete(`${url}${id}`)
// }
const getAllProducts = async()=>{
    try {
        const products = await axios.get(`${bast_url}/products`)
        return products    
    } catch (error) {
        console.log(error)
    }
    
}

const getProduct = async(id:any)=>{
    try {
        const product = await axios.get(`${bast_url}/products/${id}`)
        return product
        
    } catch (error) {
        console.log(error)
    }
    
}


export { getAllProducts,getProduct }