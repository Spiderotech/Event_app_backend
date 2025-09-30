

const Paidticketcreation = async (
    name,
    description,
    quantity,
    price,
    fees,
    salesStartDate,
    salesEndDate,
    eventId ,repositories) => {


   

    try {

        const profiledata = await repositories.organizerpaidticketcration(name,
            description,
            quantity,
            price,
            fees,
            salesStartDate,
            salesEndDate,
            eventId)
        console.log(profiledata,"pooo");



        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Paidticketcreation
