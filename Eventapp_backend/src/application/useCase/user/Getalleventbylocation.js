

const Getalleventbylocation = async (location,repositories) => {


    console.log(location,"usecasse");
    
    try {

        const profiledata =await repositories.Alleventselection(location)
       

        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Getalleventbylocation
