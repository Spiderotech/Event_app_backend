

const GetorderTickets = async (Id,repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const ticketdata =await repositories.userOrderTickets(Id)
       

        return { status: true, ticketdata }

    } catch {
        return { message: 'Error getting user ticketdata', status: false };

    }
}
export default GetorderTickets
