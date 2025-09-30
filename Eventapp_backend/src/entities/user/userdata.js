const userdata= (fullname,email,hashPassword) => {



    return{
        getname:()=>fullname,
        getemail:()=>email,
        getpassword:()=>hashPassword,

    }
 


}

export default userdata