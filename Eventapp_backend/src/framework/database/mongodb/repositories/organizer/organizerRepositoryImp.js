import Organizer from "../../models/organizer/organizerModels.js";
import Event from "../../models/organizer/eventModels.js"
import Order from "../../models/organizer/OrderModels.js";
import Ticket from "../../models/organizer/TicketModels.js";
import mongoose from "mongoose";
const { Types } = mongoose; 


const organizerRepositoryImp = () => {

  const organizerexistemail = (email) => Organizer.findOne({ email: email });

  const create = (userDetails) => {

    const newuser = new Organizer({
      name: userDetails?.getname(),
      email: userDetails?.getemail(),
      password: userDetails?.getpassword(),
      loginMethod: 'email',
      settings: { notifications: true },

    })
    return newuser.save()

  }

  const createorganizergoogle = (userDetails) => {

    const newuser = new Organizer({
      name: userDetails?.getname(),
      email: userDetails?.getemail(),
      profileImage: userDetails?.getimage(),
      loginMethod: 'google',
      settings: { notifications: true },

    })
    return newuser.save()

  }

  const updateFCMToken = async (Id, fcmtoken) => {

    console.log(fcmtoken);

    try {
      await Organizer.findByIdAndUpdate(Id, { fcmToken: fcmtoken });
      console.log("FCM token updated successfully.");
    } catch (error) {
      console.error("Error updating FCM token:", error);
      throw error;
    }



  }

  const organizerProfile = async (userId) => {

    try {
      // Fetch organizer profile
      const organizerProfile = await Organizer.findById(userId);
      
      if (!organizerProfile) {
          return { status: false, message: "Organizer not found" };
      }

      // Get total events count
      const totalEvents = await Event.countDocuments({ createdBy: userId });

      // Get count of live events
      const liveEvents = await Event.countDocuments({ createdBy: userId, status: "live" });

      return { 
          status: true, 
          organizer: organizerProfile, 
          totalEvents, 
          liveEvents
      };

  } catch (error) {
      console.error("Error fetching organizer profile with event stats:", error);
      return { status: false, message: "Error fetching organizer profile" };
  }
  }


  const organizerProfileedit = async (Id, name, about, profileImage) => {
    try {
      // Find the organizer by ID
      const organizer = await Organizer.findById(Id);

      if (!organizer) {
        throw new Error('Organizer not found');
      }

      // Update the organizer's fields
      organizer.name = name;
      organizer.about = about;
      organizer.profileImage = profileImage;
      organizer.updatedAt = new Date();

      // Save the updated organizer instance
      const updatedOrganizer = await organizer.save();

      return updatedOrganizer;
    } catch (error) {
      console.error('Error in Editorganizerprofile:', error);
      throw error;
    }
  };

  const createorganizerevent = (
    title,
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
    userId
  ) => {

    const newEvent = new Event({
      title,
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
      status: 'draft',
      createdBy: userId
    });

    return newEvent.save();
  };


  const organizerEvents = async (userId) => {
    try {
      // Fetch all events where createdBy matches the userId
      const events = await Event.find({ createdBy: userId });

      return events;
    } catch (error) {
      console.error('Error fetching organizer events:', error);
      throw new Error('Failed to fetch events.');
    }
  };

  const organizerSingleevent = async (eventId) => {
    try {
        // Find the event by ID and populate the 'createdBy' field with organizer data
        const event = await Event.findById(eventId).populate('createdBy', 'name email profileImage about');
        if (!event) {
            throw new Error('Event not found');
        }
        return event;
    } catch (error) {
        console.error("Error fetching event and organizer data:", error);
        throw error; // Handle the error in the calling function
    }
};


  const organizerpaidticketcration = async (name, description, quantity, price, fees, salesStartDate, salesEndDate, eventId) => {
    try {
      const event = await Event.findById(eventId);
      if (!event) throw new Error('Event not found');
      const newTicket = {
        type: 'paid',
        name,
        description,
        quantity,
        price,
        feesType: fees,
        salesStartDate,
        salesEndDate
      };
      event.tickets.push(newTicket);
      await event.save();
      return newTicket;
    } catch (error) {
      console.error('Error creating paid ticket:', error);
      throw error;
    }
  };

  const organizerfreeticketcration = async (name, description, quantity, salesStartDate, salesEndDate, eventId) => {
    try {
      const event = await Event.findById(eventId);
      if (!event) throw new Error('Event not found');
      const newTicket = {
        type: 'free',
        name,
        description,
        quantity,
        salesStartDate,
        salesEndDate
      };
      event.tickets.push(newTicket);
      await event.save();
      return newTicket;
    } catch (error) {
      console.error('Error creating free ticket:', error);
      throw error;
    }
  };

  const getalleventtickets = async (eventId) => {
    try {
      const event = await Event.findById(eventId);
      if (!event) throw new Error('Event not found');
      return event.tickets;
    } catch (error) {
      console.error('Error fetching event tickets:', error);
      throw error;
    }
  };

  const Publishevents = async (eventId) => {
    try {
      // 1. Find the event by ID
      const event = await Event.findById(eventId);

      if (!event) {
        throw new Error('Event not found');
      }

      // 2. Check if the event is already live
      if (event.status === 'live') {
        throw new Error('Event is already published');
      }

      // 4. Update the event status to 'live'
      event.status = 'live';
      event.updatedAt = new Date();

      // 5. Save the updated event
      const updatedEvent = await event.save();

      console.log(`Event with ID ${eventId} has been published successfully.`);
      return updatedEvent;

    } catch (error) {
      console.error(`Error publishing event: ${error.message}`);
      throw error;
    }
  };


  const organizerOrders = async (Id) => {
    try {
      // Fetch all orders related to the given organizer ID
      const orders = await Order.find({ eventId: Id });

      if (!orders.length) {
        throw new Error('No orders found for the organizer.');
      }

      return orders;
    } catch (error) {
      console.error("Error fetching organizer orders:", error);
      throw error;
    }
  };

  const organizerGetorderDetails = async (orderId) => {
    try {
      // Fetch the details of a specific order by order ID
      const orderDetails = await Order.findById(orderId).populate("eventId").populate("tickets");

      if (!orderDetails) {
        throw new Error('Order not found.');
      }

      return orderDetails;
    } catch (error) {
      console.error("Error fetching order details:", error);
      throw error;
    }
  };


  const organizerOrderstickets = async (eventId) => {
    try {
        // Fetch all orders for the specified event and populate tickets
        const orders = await Order.find({ eventId }).populate({
            path: "tickets",
            model: "Ticket",
        });

        if (!orders || orders.length === 0) {
            return { status: false, message: "No orders found for the specified event." };
        }

        // Fetch the event details
        const eventDetails = await Event.findById(eventId);
        if (!eventDetails) {
            return { status: false, message: "Event not found." };
        }

        // Extract and format ticket details with event data
        const tickets = orders.flatMap((order) =>
            (order.tickets || []).map((ticket) => ({
                ticketId: ticket._id,
                ticketName: ticket.name,
                ticketPrice: ticket.price,
                ticketStatus: ticket.isUsed ? "Used" : "Not Used",
                attendeeName: ticket.name,
                attendeeEmail: ticket.email,
                orderId: order.orderId,
                eventId: order.eventId,
                eventTitle: eventDetails.title,
                eventDescription: eventDetails.description,
                eventStartDate: eventDetails.startDate,
                eventEndDate: eventDetails.endDate,
                eventLocationType: eventDetails.locationType,
                eventCategory: eventDetails.eventCategory,
                eventImage: eventDetails.image,
            }))
        );

        return { status: true, eventDetails, tickets };
    } catch (error) {
        console.error("Error fetching organizer order tickets and event details:", error);
        return { status: false, message: "Error fetching organizer order tickets." };
    }
};





  const ticketcheckin = async (ticketId) => {
    console.log(ticketId, "in impliment");

    try {
      // Find the ticket by its ID


      // Find the ticket by `_id`
      const ticket = await Ticket.findOne({ _id: ticketId });


      if (!ticket) {
        throw new Error("Ticket not found.");
      }

      // Check if the ticket is already used
      if (ticket.isUsed) {
        throw new Error("Ticket has already been checked in.");
      }

      // Mark ticket as used
      ticket.isUsed = true;
      await ticket.save();

      console.log(`Ticket ${ticketId} has been successfully checked in.`);
      return { success: true, message: "Check-in successful", ticket };
    } catch (error) {
      console.error("Error during ticket check-in:", error);
      throw error;
    }
  };

  const ticketcheckinqrcode = async (Id) => {


  }


const getEventGrossSales = async (eventId) => {
  try {
    const result = await Order.aggregate([
      { $match: { eventId: new Types.ObjectId(eventId) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          totalSales: { $sum: "$paidAmount" },
          totalFees: { $sum: "$fee" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day"
                }
              }
            }
          },
          totalSales: 1,
          totalFees: 1,
          count: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

    return result;
  } catch (error) {
    console.error('Error fetching gross sales:', error);
    throw error;
  }
};

const getOrderSummary = async (eventId) => {
  try {
    const result = await Order.aggregate([
      { $match: { eventId: new Types.ObjectId(eventId)} },
      { $unwind: "$tickets" },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          ticketCount: { $sum: 1 },
          totalAmount: { $sum: "$paidAmount" }
        }
      },
      {
        $project: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day"
                }
              }
            }
          },
          ticketCount: 1,
          totalAmount: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);

    return result;
  } catch (error) {
    console.error('Error fetching order summary:', error);
    throw error;
  }
};

const getTotalCheckins = async (eventId) => {
  try {
    const checkinCount = await Ticket.countDocuments({
      eventId: new Types.ObjectId(eventId),
      isUsed: true
    });
    return checkinCount;
  } catch (error) {
    console.error('Error fetching total checkins:', error);
    throw error;
  }
};

const getTicketStatistics = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) throw new Error('Event not found');

    // Get ticket statistics from embedded tickets
    const ticketStats = event.tickets.reduce((acc, ticket) => {
      acc.totalAvailable += ticket.quantity;
      acc.totalSold += ticket.sold;
      acc.tickets.push({
        ticketType: ticket.type,
        name: ticket.name,
        available: ticket.quantity,
        sold: ticket.sold,
        price: ticket.price || 0,
        salesStart: ticket.salesStartDate,
        salesEnd: ticket.salesEndDate
      });
      return acc;
    }, {
      totalAvailable: 0,
      totalSold: 0,
      tickets: []
    });

    // Get actual checkins from Ticket collection
    const totalCheckins = await getTotalCheckins(eventId);

    return {
      ...ticketStats,
      totalCheckins,
      checkinPercentage: (totalCheckins / ticketStats.totalSold * 100).toFixed(2)
    };
  } catch (error) {
    console.error('Error fetching ticket statistics:', error);
    throw error;
  }
};
const updateEventlink = async (eventId,meetLink) => {
  try {
      // Find the event by ID and update the meetLink field
      const event = await Event.findByIdAndUpdate(
          eventId,
          { $set: { meetLink } },  // Updating only the meetLink field
          { new: true }  // Return the updated event
      );

      if (!event) throw new Error('Event not found');

      console.log(`Meeting link updated successfully for event ID: ${eventId}`);
      return event;
  } catch (error) {
      console.error("Error updating meeting link in event:", error);
      throw error;
  }
};


const getTicketById = async (Id) => {

  return await Ticket.findById(Id)
}


const updateorganizerevent = async (title,description,startDate,endDate,locationType,location,eventType,eventCategory,refundPolicy,privacy,image,userId,eventId) => {
  try {
      // Find and update the event
      const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          {
              title,
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
              updatedAt: new Date(), // Update timestamp
          },
          { new: true } // Return the updated document
      );

      if (!updatedEvent) {
          throw new Error("Event not found");
      }

      console.log(`Event with ID ${eventId} updated successfully.`);
      return updatedEvent;
  } catch (error) {
      console.error("Error updating event:", error);
      throw error;
  }
};

const geteventtickets = async (eventId, ticketId) => {
  try {
      const event = await Event.findOne(
          { _id: eventId, "tickets._id": ticketId },
          { "tickets.$": 1 } // Fetch only the matching ticket
      );

      if (!event) {
          return { status: false, message: "Event or ticket not found" };
      }

      return { status: true, ticket: event.tickets[0] };
  } catch (error) {
      console.error("Error fetching event ticket:", error);
      return { status: false, message: "Error fetching event ticket" };
  }
};


const organizerfreeticketedit = async (eventId, ticketId, name, description, quantity, salesStartDate, salesEndDate) => {
  try {
      const result = await Event.updateOne(
          { _id: eventId, "tickets._id": ticketId, "tickets.type": "free" },
          {
              $set: {
                  "tickets.$.name": name,
                  "tickets.$.description": description,
                  "tickets.$.quantity": quantity,
                  "tickets.$.salesStartDate": salesStartDate,
                  "tickets.$.salesEndDate": salesEndDate,
              }
          }
      );

      if (result.modifiedCount === 0) {
          return { status: false, message: "Ticket update failed. Ticket may not exist or already updated." };
      }

      return { status: true, message: "Free ticket updated successfully" };
  } catch (error) {
      console.error("Error updating free ticket:", error);
      return { status: false, message: "Error updating free ticket" };
  }
};


const organizerpaidticketedit = async (eventId, ticketId, name, description, quantity, price, fees, salesStartDate, salesEndDate) => {
  try {
      const result = await Event.updateOne(
          { _id: eventId, "tickets._id": ticketId, "tickets.type": "paid" },
          {
              $set: {
                  "tickets.$.name": name,
                  "tickets.$.description": description,
                  "tickets.$.quantity": quantity,
                  "tickets.$.price": price,
                  "tickets.$.feesType": fees,
                  "tickets.$.salesStartDate": salesStartDate,
                  "tickets.$.salesEndDate": salesEndDate,
              }
          }
      );

      if (result.modifiedCount === 0) {
          return { status: false, message: "Ticket update failed. Ticket may not exist or already updated." };
      }

      return { status: true, message: "Paid ticket updated successfully" };
  } catch (error) {
      console.error("Error updating paid ticket:", error);
      return { status: false, message: "Error updating paid ticket" };
  }
};


const deleteeventtickets = async (eventId, ticketId) => {
  try {
      // Step 1: Fetch the event to check ticket details
      const event = await Event.findById(eventId);

      if (!event) {
          return { status: false, message: "Event not found" };
      }

      // Step 2: Find the specific ticket in the event
      const ticketIndex = event.tickets.findIndex(ticket => ticket._id.toString() === ticketId);

      if (ticketIndex === -1) {
          return { status: false, message: "Ticket not found" };
      }

      const ticketToDelete = event.tickets[ticketIndex];

      // Step 3: Prevent deletion if the ticket has already been sold
      if (ticketToDelete.sold > 0) {
          return { status: false, message: "Cannot delete ticket. Some tickets have already been sold." };
      }

      // Step 4: Ensure that at least one ticket remains in the event
      if (event.tickets.length <= 1) {
          return { status: false, message: "Cannot delete ticket. An event must have at least one ticket." };
      }

      // Step 5: Remove the ticket from the event
      event.tickets.splice(ticketIndex, 1);
      await event.save();

      return { status: true, message: "Ticket deleted successfully" };
  } catch (error) {
      console.error("Error deleting event ticket:", error);
      return { status: false, message: "Error deleting event ticket" };
  }
};


const removeFCMToken = async (Id) => {
  try {
      // Remove the FCM token by setting it to null or an empty string
      await Organizer.findByIdAndUpdate(Id, { fcmToken: null });

      console.log("FCM token removed successfully.");
      return { status: true, message: "FCM token removed successfully." };

  } catch (error) {
      console.error("Error removing FCM token:", error);
      return { status: false, message: "Failed to remove FCM token" };
  }
};








  return {
    organizerexistemail,
    updateFCMToken,
    create,
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
    updateEventlink,
    getEventGrossSales,
    getOrderSummary,
    getTotalCheckins,
    getTicketStatistics,
    getTicketById,
    updateorganizerevent,
    deleteeventtickets,
    organizerfreeticketedit,
    organizerpaidticketedit,
    geteventtickets,
    removeFCMToken

  }
}

export default organizerRepositoryImp
