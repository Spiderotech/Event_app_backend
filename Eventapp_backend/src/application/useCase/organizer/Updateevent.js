

const Updateevent = async (title,
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
    userId,eventId, repositories) => {


    console.log(userId, "usecasse");

    try {

        const updatedata = await repositories.updateorganizerevent(title,
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
            userId,eventId)
        console.log(updatedata,"pooo");



        return { status: true, updatedata }

    } catch {
        return { message: 'Error getting user profile', status: false };

    }
}
export default Updateevent
