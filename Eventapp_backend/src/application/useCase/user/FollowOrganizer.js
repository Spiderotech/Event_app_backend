const FollowOrganizer = async (userId, organizerId, repositories) => {
    try {
        const follow = await repositories.followOrganizer(userId, organizerId);
        console.log(follow);
        
        return { status: true, message: "Organizer followed successfully", follow };
    } catch (error) {
        console.error("Error following organizer:", error);
        return { status: false, message: "Error following organizer" };
    }
};

export default FollowOrganizer;
