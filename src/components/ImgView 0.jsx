
import React ,{useState,useEffect} from 'react'
import { storage } from '../appwriteConfig'

const ImgView=(data1)=> {
    const [imgUrl,setImgUrl]=useState(null)
    const [isLoadding,setIsLoadding]=useState(false)
    const [error,setError]=useState(null)
if(data1.featuredImage){console.log("ok0",data1.featuredImage)}
    useEffect(()=>{
        console.log("Ok")
       const fetchImg= async()=>{
        setIsLoadding(true)
        setError(null)
        console.log("Ok2")
        try{
          //  const filepath=imgId?${'storageId/${imgId}':imgId;
        const result =await  
       console.log("url",result.href)
        setImgUrl(result.href)
    }catch(err){
        setError(err.message);
    }finally{
        setIsLoadding(false)
    }
        };
        
            fetchImg();
    

       } ,[]);

    if(isLoadding){
        return <p> Loading Image</p>
    }if(error){
        return<p> {error}</p>
    }
    if(!imgUrl){
        return <p> Image Not Found</p>
    }

  return (
    <div>
        <img src={imgUrl} alt='Appwrite Image'/>
    </div>
  )
}

export default ImgView