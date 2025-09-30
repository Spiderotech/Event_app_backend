

const Freeticketcreation = async (name ,description,
    quantity,
    salesStartDate,
    salesEndDate,
    eventId,repositories) => {


    

    try {

        const profiledata = await repositories.organizerfreeticketcration(name, description,
            quantity,
            salesStartDate,
            salesEndDate,
            eventId,)
        console.log(profiledata,"pooo");



        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Freeticketcreation
