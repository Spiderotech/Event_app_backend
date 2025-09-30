

const organizerRepositoryInt = (repository) => {

  const organizerexistemail = (email) => repository.organizerexistemail(email);
  const create = (userDetails) => repository.create(userDetails);
  const updateFCMToken = (Id, fcmtoken) => repository.updateFCMToken(Id, fcmtoken)
  const removeFCMToken = (Id) => repository.removeFCMToken(Id)
  const createorganizergoogle = (userDetails) => repository.createorganizergoogle(userDetails);
  const organizerProfile = (Id) => repository.organizerProfile(Id);
  const organizerProfileedit = (Id, name, about, profileImage) => repository.organizerProfileedit(Id, name, about, profileImage);
  const createorganizerevent = (title,
    description,
    startDate,
    endDate,
    locationType,
    location,
    eventType,
    eventCategory,
    refundPolicy,
    privacy,
    image,
    userId) => repository.createorganizerevent(title,
      description,
      startDate,
      endDate,
      locationType,
      location,
      eventType,
      eventCategory,
      refundPolicy,
      privacy,
      image,
      userId);
  const organizerEvents = (Id) => repository.organizerEvents(Id);
  const organizerSingleevent = (Id) => repository.organizerSingleevent(Id);
  const organizerpaidticketcration = (name,
    description,
    quantity,
    price,
    fees,
    salesStartDate,
    salesEndDate,
    eventId) => repository.organizerpaidticketcration(name,
      description,
      quantity,
      price,
      fees,
      salesStartDate,
      salesEndDate,
      eventId);
  const organizerfreeticketcration = (name, description,
    quantity,
    salesStartDate,
    salesEndDate,
    eventId) => repository.organizerfreeticketcration(name, description,
      quantity,
      salesStartDate,
      salesEndDate,
      eventId,);

  const getalleventtickets = (Id) => repository.getalleventtickets(Id);
  const Publishevents = (Id) => repository.Publishevents(Id);
  const organizerOrders = (Id) => repository.organizerOrders(Id);
  const organizerGetorderDetails = (Id) => repository.organizerGetorderDetails(Id);
  const organizerOrderstickets = (Id) => repository.organizerOrderstickets(Id);
  const ticketcheckin = (Id) => repository.ticketcheckin(Id);
  const ticketcheckinqrcode = (Id) => repository.ticketcheckinqrcode(Id);
  const getEventGrossSales = (eventId) => repository.getEventGrossSales(eventId);
  const getOrderSummary = (eventId) => repository.getOrderSummary(eventId);
  const getTotalCheckins = (eventId) => repository.getTotalCheckins(eventId);
  const getTicketStatistics = (eventId) => repository.getTicketStatistics(eventId);
  const updateEventlink = (eventId,meetLink) => repository.updateEventlink(eventId,meetLink);
  const getTicketById = (Id) => repository.getTicketById(Id);
  const updateorganizerevent = (title,description,startDate,endDate,locationType,location,eventType,eventCategory,refundPolicy,privacy,image,userId,eventId) => repository.updateorganizerevent(title,description,startDate,endDate,locationType,location,eventType,eventCategory,refundPolicy,privacy,image,userId,eventId);
  const geteventtickets = (eventId,ticketId) => repository.geteventtickets(eventId,ticketId);
  const deleteeventtickets = (eventId,ticketId) => repository.deleteeventtickets(eventId,ticketId);
  const organizerfreeticketedit = (eventId,ticketId,name ,description,quantity,salesStartDate,salesEndDate) => repository.organizerfreeticketedit(eventId,ticketId,name ,description,quantity,salesStartDate,salesEndDate);
  const organizerpaidticketedit = (eventId,ticketId,name,description,quantity,price,fees,salesStartDate,salesEndDate) => repository.organizerpaidticketedit(eventId,ticketId,name,description,quantity,price,fees,salesStartDate,salesEndDate);






  return {
    organizerexistemail,
    create,
    updateFCMToken,
    removeFCMToken,
    createorganizergoogle,
    organizerProfile,
    organizerProfileedit,
    createorganizerevent,
    organizerEvents,
    organizerSingleevent,
    organizerpaidticketcration,
    organizerfreeticketcration,
    getalleventtickets,
    Publishevents,
    organizerOrders,
    organizerGetorderDetails,
    organizerOrderstickets,
    ticketcheckinqrcode,
    ticketcheckin,
    getEventGrossSales,
    getOrderSummary,
    getTotalCheckins,
    getTicketStatistics,
    updateEventlink,
    getTicketById,
    updateorganizerevent,
    deleteeventtickets,
    organizerfreeticketedit,
    organizerpaidticketedit,
    geteventtickets,
  
    


  }
}

export default organizerRepositoryInt
