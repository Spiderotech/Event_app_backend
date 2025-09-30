import fileUpload from "../../application/useCase/commonservice/FileuploadingUrl.js"

const commonserviceController = () => {
    const s3service=(req,res)=>{
        fileUpload().then((response)=>{
            
            res.json({response})
            

        }).catch(()=>console.log(ErrorEvent))
    }


  return {
    s3service

  }
}

export default commonserviceController
