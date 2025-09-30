

const Paidticketedit = async (eventId,ticketId,name,description,quantity,price,fees,salesStartDate,salesEndDate ,repositories) => {
    try {

        const profiledata = await repositories.organizerpaidticketedit(eventId,ticketId,name,
            description,
            quantity,
            price,
            fees,
            salesStartDate,
            salesEndDate,
            )
        console.log(profiledata,"pooo");



        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Paidticketedit
