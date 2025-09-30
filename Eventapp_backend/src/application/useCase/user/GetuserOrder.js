

const GetuserOrder = async (Id,repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const orderdata =await repositories.userOrders(Id)
        console.log(orderdata[0].eventId);
        console.log(orderdata[0].tickets);
        
       

        return { status: true, orderdata }

    } catch {
        return { message: 'Error getting user orderdata', status: false };

    }
}
export default GetuserOrder
