

const Cretaeevent = async (title,
    description,
    startDate,
    endDate,
    locationType,
    location,
    eventType,
    eventCategory,
    refundPolicy,
    privacy,
    image,
    userId, repositories) => {


    console.log(userId, "usecasse");

    try {

        const profiledata = await repositories.createorganizerevent(title,
            description,
            startDate,
            endDate,
            locationType,
            location,
            eventType,
            eventCategory,
            refundPolicy,
            privacy,
            image,
            userId)
        console.log(profiledata,"pooo");



        return { status: true, profiledata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Cretaeevent
