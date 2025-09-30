

const Logout = async (Id,repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const profiledata =await repositories.removeFCMToken(Id)
       

        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Logout
