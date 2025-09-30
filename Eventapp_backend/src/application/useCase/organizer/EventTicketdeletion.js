

const EventTicketdeletion = async (eventId,ticketId,repositories) => {


    console.log(eventId,ticketId,"usecasse");
    
    try {

        const profiledata =await repositories.deleteeventtickets(eventId,ticketId)
       

        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default EventTicketdeletion
