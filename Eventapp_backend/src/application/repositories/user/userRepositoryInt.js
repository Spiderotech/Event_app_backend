

const userRepositoryInt = (repository) => {
  const userexistemail = (email) => repository.userexistemail(email);
  const create = (userDetails) => repository.create(userDetails);
  const updateFCMToken = (Id, fcmtoken) => repository.updateFCMToken(Id, fcmtoken)
  const removeFCMToken = (Id) => repository.removeFCMToken(Id)
  const createUsergoogle = (userDetails) => repository.createUsergoogle(userDetails);
  const Alleventselection = (location) => repository.Alleventselection(location);
  const organizerSingleevent = (Id) => repository.organizerSingleevent(Id);
  const userProfile = (Id) => repository.userProfile(Id);
  const userProfileedit = (Id, name, profileImage) => repository.userProfileedit(Id, name, profileImage);
  const organizerprofile = (Id) => repository.organizerprofile(Id);
  const organizerEvents = (Id) => repository.organizerEvents(Id);


  const addFavorite = (userId, eventId) => repository.addFavorite(userId, eventId);
  const removeFavorite = (userId, eventId) => repository.removeFavorite(userId, eventId);
  const checkFavorite = (userId, eventId) => repository.checkFavorite(userId, eventId);
  const getFavoriteEvents = (userId) => repository.getFavoriteEvents(userId);
  const getFavoritesCount = (userId) => repository.getFavoritesCount(userId);

  // Following
  const followOrganizer = (userId, organizerId) => repository.followOrganizer(userId, organizerId);
  const unfollowOrganizer = (userId, organizerId) => repository.unfollowOrganizer(userId, organizerId);
  const checkFollowing = (userId,organizerId) => repository.checkFollowing(userId, organizerId);
  const getFollowing = (userId) => repository.getFollowing(userId);
  const getFollowingCount = (userId) => repository.getFollowingCount(userId);
  const CreateOrder = (userId, eventId, contactInformation, tickets, isPaid, paymentMethod, paidAmount, fee, paymentId) => repository.CreateOrder(userId, eventId, contactInformation, tickets, isPaid, paymentMethod, paidAmount, fee, paymentId);
  const userOrderTickets = (userId) => repository.userOrderTickets(userId);
  const userOrders = (userId) => repository.userOrders(userId);
  


  return {
    userexistemail,
    create,
    updateFCMToken,
    removeFCMToken,
    createUsergoogle,
    Alleventselection,
    organizerSingleevent,
    userProfile,
    userProfileedit,
    addFavorite,
    removeFavorite,
    checkFavorite,
    followOrganizer,
    unfollowOrganizer,
    checkFollowing,
    organizerprofile,
    organizerEvents,
    getFavoriteEvents,
    getFollowing,
    getFavoritesCount,
    getFollowingCount,
    CreateOrder,
    userOrderTickets,
    userOrders

  }
}

export default userRepositoryInt
