
const Environment = process.env.NODE_ENV

type GconfigType = {
    api_url:string,
    image_url:string,
    environment:string
}

let  Gconfig:GconfigType = {
    api_url:'',
    image_url:'',
    environment:''
}
const API_URL = process.env.NEXT_PUBLIC_API_URL
const IMAGE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL



if(Environment == 'development'){
     Gconfig = {
        api_url:"http://localhost:5000",
        image_url:IMAGE_URL|| '',
        environment:Environment
    }
}

if(Environment == 'production'){
    Gconfig = {
       api_url:API_URL|| '',
       image_url:IMAGE_URL|| '',
       environment:Environment
   }
}

export default Gconfig

 

