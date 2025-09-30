

const GetorganizerOrdertickets = async (Id,repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const orderdata =await repositories.organizerOrderstickets(Id)
        
        
       

        return { status: true, orderdata }

    } catch {
        return { message: 'Error getting user orderdata', status: false };

    }
}
export default GetorganizerOrdertickets
