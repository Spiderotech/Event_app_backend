

const Editorganizerprofile = async (Id,name, about, profileImage, repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const profiledata =await repositories.organizerProfileedit(Id,name, about, profileImage)
        console.log(profiledata);
        
       

        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Editorganizerprofile
