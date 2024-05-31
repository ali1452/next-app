
const Environment = process.env.NODE_ENV

type GconfigType = {
    api_url:string,
    image_url:string
}

let  Gconfig:GconfigType = {
    api_url:'',
    image_url:''
}
const API_URL = "https://express-project-smoky.vercel.app"
const IMAGE_URL = "https://res.cloudinary.com/dpnza2tuy/image/upload/v1717048876/"



if(Environment == 'development'){
     Gconfig = {
        api_url:API_URL,
        image_url:IMAGE_URL
    }
}

if(Environment == 'production'){
    Gconfig = {
       api_url:API_URL,
       image_url:IMAGE_URL
   }
}

export default Gconfig

 

