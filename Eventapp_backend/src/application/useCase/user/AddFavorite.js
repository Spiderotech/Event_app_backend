const AddFavorite = async (userId, eventId, repositories) => {
    try {
        const favorite = await repositories.addFavorite(userId, eventId);
        return { status: true, message: "Event added to favorites", favorite };
    } catch (error) {
        console.error("Error adding to favorites:", error);
        return { status: false, message: "Error adding event to favorites" };
    }
};

export default AddFavorite;
