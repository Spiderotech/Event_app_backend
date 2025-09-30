import userRouter from "./user/user.js"
import organizerRouter from "./organizer/organizer.js"
import commonservice from "./commonservice.js"

const  routes=( app,express)=>{

    app.use('/api/v1/user',userRouter(express))
    app.use('/api/v1/service',commonservice(express))
    app.use('/api/v1/organizer',organizerRouter(express))
   

    
    

}
export default routes