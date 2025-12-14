import axios from "axios"
import Gconfig  from "@/globalConfig"

const base_url = Gconfig.api_url

const getAllProducts = async (token?: string | null)=>{
    try {
        const headers: Record<string, string> = {}

        if (token) {
            headers.Authorization = `Bearer ${token}`
        }

        const products = await axios.get(`${base_url}/products`, { headers })
        console.log('Products fetched:', products)
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



type SignupPayload = {
    first_name: string
    last_name: string
    email: string
    password: string
}

const signupUser = async (payload: SignupPayload) => {
    try {
        const res = await axios.post(`${base_url}/user`, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res.data
    } catch (error) {
        console.error('Error signing up user:', error)
        throw error
    }
}

type LoginPayload = {
    email: string
    password: string
}

const loginUser = async (payload: LoginPayload) => {
    try {
        const res = await axios.post(`${base_url}/user/login`, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res.data
    } catch (error) {
        console.error('Error logging in user:', error)
        throw error
    }
}

const getFavoriteProducts = async (token: string) => {
    try {
        const res = await axios.get(`${base_url}/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return res.data
    } catch (error) {
        console.error('Error fetching favorite products:', error)
        throw error
    }
}

type ToggleFavouritePayload = {
    "_id": string,
    "user": string,
    "product_id": string,
    "isFavourite": boolean
}

const toggledFavouirte = async (payload: ToggleFavouritePayload, token?: string) => {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        }

        if (token) {
            headers.Authorization = `Bearer ${token}`
            const res = await axios.post(`${base_url}/favorites`, payload, { headers })
            return res.data
        }

        throw new Error('Authentication token is required to toggle favourite product.')

        
    } catch (error) {
        console.error('Error toggling favourite product:', error)
        throw error
    }
}



export { getAllProducts,getProduct,getAllOrders,postOrder,signupUser,loginUser,getFavoriteProducts,toggledFavouirte }