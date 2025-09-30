const GetOrderSummary = async (eventId, repositories) => {
    try {
      const orderSummary = await repositories.getOrderSummary(eventId);
      return { status: true, orderSummary };
    } catch (error) {
      return { message: 'Error fetching order summary', status: false };
    }
  };
  export default GetOrderSummary;