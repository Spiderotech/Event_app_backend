const GetTicketStatistics = async (eventId, repositories) => {
    try {
      const stats = await repositories.getTicketStatistics(eventId);
      return { status: true, stats };
    } catch (error) {
      return { message: 'Error fetching ticket stats', status: false };
    }
  };
  export default GetTicketStatistics;