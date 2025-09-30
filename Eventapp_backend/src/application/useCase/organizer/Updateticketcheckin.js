

const Updateticketcheckin = async (Id,repositories) => {


    console.log(Id,"usecasse of update");
    
    try {

        const profiledata =await repositories.ticketcheckin(Id)
        console.log(profiledata,"pdwwww");
        
       

        return { status: true,profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Updateticketcheckin
