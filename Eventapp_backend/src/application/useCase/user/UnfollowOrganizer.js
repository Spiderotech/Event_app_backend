const UnfollowOrganizer = async (userId, organizerId, repositories) => {
    try {
        const unfollow = await repositories.unfollowOrganizer(userId, organizerId);
        return { status: true, message: "Organizer unfollowed successfully", unfollow };
    } catch (error) {
        console.error("Error unfollowing organizer:", error);
        return { status: false, message: "Error unfollowing organizer" };
    }
};

export default UnfollowOrganizer;
