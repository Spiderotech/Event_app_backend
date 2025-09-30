const organizerdata= (fullname,email,hashPassword) => {



    return{
        getemail:()=>email,
        getname:()=>fullname,
        getpassword:()=>hashPassword,

    }
 


}

export default organizerdata