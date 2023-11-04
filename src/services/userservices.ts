import axios from "axios"

const url = `http://localhost:5000/user/`

const fetchAllUsers =async()=>{
    const users = await axios.get(url)
    return users
}

const createUser = async(data:any)=>{
    const newUser = await axios.post(url,data)
    return newUser
}

const deleteUser = async(id:string)=>{
    await axios.delete(`${url}${id}`)
}



export { fetchAllUsers, createUser, deleteUser }