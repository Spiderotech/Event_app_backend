

const Editorganizerprofile = async (Id,name, profileImage, repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const profiledata =await repositories.userProfileedit(Id,name, profileImage)
        console.log(profiledata);
        
       

        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Editorganizerprofile
