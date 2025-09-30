

const EventTickets = async (eventId,ticketId,repositories) => {


    console.log(eventId, ticketId,"usecasse");
    
    try {

        const profiledata =await repositories.geteventtickets(eventId,ticketId)
       

        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default EventTickets
