const CheckFollowing = async (userId, organizerId, repositories) => {
    try {
        const isFollowing = await repositories.checkFollowing(userId, organizerId);
        console.log(isFollowing);
        
        return { status: true, isFollowing };
    } catch (error) {
        console.error("Error checking following status:", error);
        return { status: false, message: "Error checking following status" };
    }
};

export default CheckFollowing;
