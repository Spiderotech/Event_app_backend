const GetGrossSales = async (eventId, repositories) => {
    try {
      const salesData = await repositories.getEventGrossSales(eventId);
      return { status: true, salesData };
    } catch (error) {
      return { message: 'Error fetching sales data', status: false };
    }
  };
  export default GetGrossSales;