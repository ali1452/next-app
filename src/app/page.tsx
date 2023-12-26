import MainLayout from '@/container/mainLayout'
import { fetchAllUsers } from '@/services/userservices'

// const getAllUser  =  async()=>{
// return await fetchAllUsers()

// }

export default async function Home() {
  // const {data} = await getAllUser()
  return (
   <>
   <MainLayout />
   </>
  )
}
