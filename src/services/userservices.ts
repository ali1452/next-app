import axios from "axios"

// const url = `http://localhost:5000/user/`
const bast_url ='https://express-project-smoky.vercel.app'

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