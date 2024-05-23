import MainLayout from '@/container/mainLayout'
import { getAllProducts } from '@/services/userservices'

export default async function Home() {
  let data = []
  const resp = await getAllProducts()
  if(resp?.status ==200){
    data = resp.data
  }

  return (
   <>
   <MainLayout productData ={data} />
   </>
  )
}
