const GetTotalCheckins = async (eventId, repositories) => {
    try {
      const checkins = await repositories.getTotalCheckins(eventId);
      return { status: true, checkins };
    } catch (error) {
      return { message: 'Error fetching checkins', status: false };
    }
  };
  export default GetTotalCheckins;