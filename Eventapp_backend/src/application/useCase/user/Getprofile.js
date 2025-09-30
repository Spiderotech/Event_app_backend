

const Getprofile = async (Id,repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const profiledata =await repositories.userProfile(Id)
       

        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Getprofile
