const CreatenewOrder = async (userId,eventId,contactInformation,tickets,isPaid,paymentMethod,paidAmount,fee,paymentId,repositories) => {
        console.log(userId,
            eventId,
            contactInformation,
            tickets,
            isPaid,
            paymentMethod,
            paidAmount,
            fee,
            paymentId,"usecase");
        
    try {
        const neworder = await repositories.CreateOrder(userId,eventId,contactInformation,tickets,isPaid,paymentMethod,paidAmount,fee,paymentId);
        console.log(neworder,"pooo");
        
        return { status: true, neworder };
    } catch (error) {
        console.error("Error checking favorite status:", error);
        return { status: false, message: "Error checking favorite status" };
    }
};

export default CreatenewOrder;
