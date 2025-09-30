const RemoveFavorite = async (userId, eventId, repositories) => {
    try {
        const removed = await repositories.removeFavorite(userId, eventId);
        return { status: true, message: "Event removed from favorites", removed };
    } catch (error) {
        console.error("Error removing from favorites:", error);
        return { status: false, message: "Error removing event from favorites" };
    }
};

export default RemoveFavorite;
