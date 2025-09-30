const CheckFavorite = async (userId, eventId, repositories) => {
    try {
        const isFavorite = await repositories.checkFavorite(userId, eventId);
        console.log(isFavorite);
        
        return { status: true, isFavorite };
    } catch (error) {
        console.error("Error checking favorite status:", error);
        return { status: false, message: "Error checking favorite status" };
    }
};

export default CheckFavorite;
