

const Getfollowingcount = async (Id,repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const count =await repositories.getFollowingCount(Id)
       

        return { status: true, count }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Getfollowingcount
