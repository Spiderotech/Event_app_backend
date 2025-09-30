

const GetorganizerOrder = async (Id,repositories) => {


    console.log(Id,"usecasse");
    
    try {

        const orderdata =await repositories.organizerOrders(Id)
        
        
       

        return { status: true, orderdata }

    } catch {
        return { message: 'Error getting user orderdata', status: false };

    }
}
export default GetorganizerOrder
