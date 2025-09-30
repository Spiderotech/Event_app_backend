

const GetFollowingorganizer = async (Id,repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const profiledata =await repositories.getFollowing(Id)
       

        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default GetFollowingorganizer
