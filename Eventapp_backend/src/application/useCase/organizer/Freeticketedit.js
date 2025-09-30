

const Freeticketedit = async (eventId,ticketId,name ,description,quantity,salesStartDate,salesEndDate,repositories) => {
    try {

        const profiledata = await repositories.organizerfreeticketedit(eventId,ticketId,name, description,
            quantity,
            salesStartDate,
            salesEndDate,
            )
        console.log(profiledata,"pooo");



        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Freeticketedit
