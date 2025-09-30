

const GetorderDetails = async (Id,repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const ticketdata =await repositories.organizerGetorderDetails(Id)
       

        return { status: true, ticketdata }

    } catch {
        return { message: 'Error getting user ticketdata', status: false };

    }
}
export default GetorderDetails
