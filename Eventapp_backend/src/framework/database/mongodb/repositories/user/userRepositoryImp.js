import User from "../../models/user/userModels.js";
import Event from "../../models/organizer/eventModels.js"
import Organizer from "../../models/organizer/organizerModels.js";
import Order from "../../models/organizer/OrderModels.js";
import Ticket from "../../models/organizer/TicketModels.js";

const userRepositoryImp = () => {

    const userexistemail = (email) => User.findOne({ email: email });

    const create = (userDetails) => {
       
        const newuser = new User({
          name:userDetails?.getname(),
          email:userDetails?.getemail(),
          password:userDetails?.getpassword(),
          loginMethod: 'email', 
          settings: { notifications: true },
        
        })
        return newuser.save()
    
      }

      const createUsergoogle = (userDetails) => {
       
        const newuser = new User({
          name:userDetails?.getname(),
          email:userDetails?.getemail(),
          profileImage:userDetails?.getimage(),
          loginMethod: 'google', 
          settings: { notifications: true },
        
        })
        return newuser.save()
    
      }

      const updateFCMToken = async(Id,fcmtoken) => {

        console.log(fcmtoken);
  
        try {
          await User.findByIdAndUpdate(Id, { fcmToken: fcmtoken });
          console.log("FCM token updated successfully.");
        } catch (error) {
          console.error("Error updating FCM token:", error);
          throw error; 
        }
         
        
    
      }


      const Alleventselection = async (location) => {
        try {
            let events;
    
            if (location && location.toLowerCase() !== 'online') {
                // 🌍 Fetch 'live' events matching the provided location
                events = await Event.find({
                    'location.name': { $regex: new RegExp(location, 'i') },  // Case-insensitive search
                    status: 'live'  // ✅ Only fetch live events
                });
    
                // 🔍 If no live events found, fetch online live events
                if (events.length === 0) {
                    console.log(`No live events found for ${location}. Fetching online live events...`);
                    events = await Event.find({
                        locationType: 'online',
                        status: 'live'  // ✅ Only fetch live online events
                    });
                }
            } else {
                // 🌐 If location is 'online' or not provided, fetch online live events
                events = await Event.find({
                    locationType: 'online',
                    status: 'live'  // ✅ Only fetch live online events
                });
            }
    
            return events;
        } catch (error) {
            console.error(`Error fetching live events for location: ${location}`, error);
            throw error;
        }
    };
    

    const organizerSingleevent = async (userId) => {

      const event = await Event.findById(userId).populate('createdBy', '_id  name  email profileImage about followers');
      return event;
    }


    const userProfile = async (userId) => {

      return await User.findById(userId)
    }


    const userProfileedit = async (Id, name, profileImage) => {
      try {
        // Find the organizer by ID
        const user = await User.findById(Id);
  
        if (!user) {
          throw new Error('Organizer not found');
        }
  
        // Update the organizer's fields
        user.name = name;
        user.profileImage = profileImage;
        user.updatedAt = new Date();
  
        // Save the updated organizer instance
        const updateduser = await user.save();
  
        return updateduser;
      } catch (error) {
        console.error('Error in Editorganizerprofile:', error);
        throw error;
      }
    };


    const followOrganizer = async (userId, organizerId) => {
      try {
          // Find user and organizer
          const user = await User.findById(userId);
          const organizer = await Organizer.findById(organizerId);
  
          if (!user || !organizer) {
              throw new Error('User or Organizer not found');
          }
  
          // Check if already following
          if (user.following.includes(organizerId)) {
              throw new Error('Already following this organizer');
          }
  
          // Add to following and followers
          user.following.push(organizerId);
          organizer.followers.push(userId);
  
          // Save changes
          await user.save();
          await organizer.save();
  
          return { message: 'Successfully followed the organizer' };
      } catch (error) {
          console.error('Error in followOrganizer:', error);
          throw error;
      }
  };


  const unfollowOrganizer = async (userId, organizerId) => {
    try {
        // Find user and organizer
        const user = await User.findById(userId);
        const organizer = await Organizer.findById(organizerId);

        if (!user || !organizer) {
            throw new Error('User or Organizer not found');
        }

        // Check if following
        if (!user.following.includes(organizerId)) {
            throw new Error('Not following this organizer');
        }

        // Remove from following and followers
        user.following = user.following.filter(id => id.toString() !== organizerId);
        organizer.followers = organizer.followers.filter(id => id.toString() !== userId);

        // Save changes
        await user.save();
        await organizer.save();

        return { message: 'Successfully unfollowed the organizer' };
    } catch (error) {
        console.error('Error in unfollowOrganizer:', error);
        throw error;
    }
};

const getFollowing = async (userId) => {
  try {
      const user = await User.findById(userId).populate('following', 'name email  profileImage');

      if (!user) {
          throw new Error('User not found');
      }

      return user.following;
  } catch (error) {
      console.error('Error in getFollowing:', error);
      throw error;
  }
};


const checkFollowing = async (userId, organizerId) => {
  try {
      // Find the user
      const user = await User.findById(userId);
      console.log(user);
      console.log(organizerId);
      
      

      if (!user) {
          throw new Error('User not found');
      }

      // Check if the organizer is in the user's following list
      const isFollowing = user.following.includes(organizerId);

      return isFollowing;
  } catch (error) {
      console.error('Error in isUserFollowingOrganizer:', error);
      throw error;
  }
};

const addFavorite = async (userId, eventId) => {
  try {
      // Find the user
      const user = await User.findById(userId);

      if (!user) {
          throw new Error('User not found');
      }

      // Check if the event is already in favorites
      if (user.favorites.includes(eventId)) {
          throw new Error('Event is already in favorites');
      }

      // Add the event to favorites
      user.favorites.push(eventId);
      await user.save();

      return { message: 'Event added to favorites', favorites: user.favorites };
  } catch (error) {
      console.error('Error in addFavoriteEvent:', error);
      throw error;
  }
};


const removeFavorite = async (userId, eventId) => {
  try {
      // Find the user
      const user = await User.findById(userId);

      if (!user) {
          throw new Error('User not found');
      }

      // Check if the event is in favorites
      if (!user.favorites.includes(eventId)) {
          throw new Error('Event is not in favorites');
      }

      // Remove the event from favorites
      user.favorites = user.favorites.filter(id => id.toString() !== eventId);
      await user.save();

      return { message: 'Event removed from favorites', favorites: user.favorites };
  } catch (error) {
      console.error('Error in removeFavoriteEvent:', error);
      throw error;
  }
};


const getFavoriteEvents = async (userId) => {
  try {
      // Find the user and populate the favorite events
      const user = await User.findById(userId).populate('favorites', 'title image startDate endDate locationType tickets');

      if (!user) {
          throw new Error('User not found');
      }

      return user.favorites;
  } catch (error) {
      console.error('Error in getFavoriteEvents:', error);
      throw error;
  }
};


const checkFavorite = async (userId, eventId) => {
  try {
      // Find the user
      const user = await User.findById(userId);

      if (!user) {
          throw new Error('User not found');
      }

      // Check if the event ID exists in the user's favorites array
      const isFavorite = user.favorites.includes(eventId);

      return isFavorite;
  } catch (error) {
      console.error('Error in isEventFavorite:', error);
      throw error;
  }
};


const organizerprofile = async (userId) => {

  return await Organizer.findById(userId)
}



const organizerEvents = async (userId) => {
  try {
    // Fetch events with "live" status created by the specified userId
    const liveEvents = await Event.find({ createdBy: userId, status: 'live' });

    return liveEvents;
  } catch (error) {
    console.error('Error fetching live organizer events:', error);
    throw new Error('Failed to fetch live events.');
  }
};


const getFollowingCount = async (userId) => {
  try {
    // Find the user by ID and count the number of items in the `following` array
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const followingCount = user.following.length;

    return followingCount;
  } catch (error) {
    console.error('Error in getFollowingCount:', error);
    throw error;
  }
};

const getFavoritesCount = async (userId) => {
  try {
    // Find the user by ID and count the number of items in the `favorites` array
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const favoritesCount = user.favorites.length;

    return favoritesCount;
  } catch (error) {
    console.error('Error in getFavoritesCount:', error);
    throw error;
  }
};

const CreateOrder = async (
  userId,
  eventId,
  contactInformation,
  tickets,
  isPaid,
  paymentMethod,
  paidAmount,
  fee,
  paymentId
) => {
  console.log(
    userId,
    eventId,
    contactInformation,
    tickets,
    isPaid,
    paymentMethod,
    paidAmount,
    fee,
    paymentId,
    "Order Creation Debug"
  );

  try {
    // Validate required fields
    if (!userId || !eventId || !contactInformation || !tickets || tickets.length === 0) {
      throw new Error("Missing required fields for order creation.");
    }

    const uniqueOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Step 1: Create the order object
    const orderData = {
      orderId: uniqueOrderId,
      userId,
      eventId,
      contactInformation,
      tickets: [], // Placeholder for ticket IDs
      isPaid,
      paymentMethod,
      paidAmount: isPaid ? paidAmount : 0,
      fee: isPaid ? fee : 0,
      paymentId: isPaid ? paymentId : null,
    };

    const newOrder = await Order.create(orderData);
    console.log("Order Created:", newOrder);

    if (!newOrder || !newOrder._id) {
      throw new Error("Failed to create order.");
    }

    console.log(tickets);
    

    // Step 2: Format ticket instances with the order ID
    const ticketInstances = tickets.map((ticket) => ({
      ticketId: `${ticket.eventTicketId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Ensure unique ticket ID
      orderId: newOrder._id, // Associate with the created order
      eventId,
      eventTicketId: ticket.eventTicketId,
      name: ticket.name,
      email: ticket.email,
      price: ticket.price,
      isUsed: false,
    }));

    console.log("Formatted Ticket Instances:", ticketInstances);

    // Step 3: Save tickets and collect their IDs
    const savedTickets = await Ticket.insertMany(ticketInstances);
    const ticketIds = savedTickets.map((ticket) => ticket._id);

    console.log("Saved Tickets:", savedTickets);

    // Step 4: Update the order with the ticket IDs
    newOrder.tickets = ticketIds;
    await newOrder.save();

    // Step 5: Increment the sold count for each ticket type
    await Promise.all(
      tickets.map(async (ticket) => {
        const updateResult = await Event.updateOne(
          { _id: eventId, "tickets._id": ticket.eventTicketId },
          { $inc: { "tickets.$.sold": 1 } }
        );
        console.log("Updated Event Sold Count:", updateResult);
      })
    );

    console.log("Order and Tickets Updated Successfully");
    return { success: true, order: newOrder };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};



const userOrders = async (userId) => {
  try {
    // Fetch all orders placed by the user, along with event details
    const orders = await Order.find({ userId })
      .populate({
        path: "eventId", // Populate event details
        select: "title image location startDate endDate organizer", // Select specific fields from the event
       
      })
      .populate({
        path: "tickets", // Populate ticket details
        select: "ticketId name email price eventTicketId", // Select specific ticket fields
      })
      .exec();

    if (!orders || orders.length === 0) {
      throw new Error("No orders found for the user.");
    }

    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

const userOrderTickets = async (orderId) => {
  try {
    // Fetch tickets associated with a specific order along with event details and organizer info
    const tickets = await Ticket.find({ orderId })
      .populate({
        path: "eventId", // Populate event details
        select: "title image locationType location startDate endDate createdBy", // Select specific fields from the event
        populate: {
          path: "createdBy", // Populate organizer details within the event
          model: "Organizer", // Ensure the model name matches your Organizer model
          select: "name profileImage", // Select specific fields from the organizer
          options: { strictPopulate: false }, // Handle missing fields gracefully
        },
      })
      .exec();

    // Handle case where no tickets are found
    if (!tickets || tickets.length === 0) {
      throw new Error("No tickets found for the specified order.");
    }

    // Return tickets with populated data
    return tickets;
  } catch (error) {
    console.error("Error fetching order tickets:", error.message);
    throw error;
  }
};











  return{
    userexistemail,
    updateFCMToken,
    create,
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

export default userRepositoryImp
