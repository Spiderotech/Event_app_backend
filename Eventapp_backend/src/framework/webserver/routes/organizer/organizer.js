// Import necessary modules and dependencies
import organizerController from "../../../../adapters/controllers/organizer/organizerController.js";
import organizerServiceImp from "../../../services/organizer/organizerServiceImp.js";
import organizerRepositoryImp from "../../../database/mongodb/repositories/organizer/organizerRepositoryImp.js";
import organizerRepositoryInt from "../../../../application/repositories/organizer/organizerRepositoryInt.js";
import organizerServiceInt from "../../../../application/services/organizer/organizerServiceInt.js";

/**
 * Organizer Router
 * Defines all the routes related to organizer functionalities.
 * @param {Object} express - Express instance
 * @returns {Object} router - Express Router instance
 */
const organizerRouter = (express) => {
  // Initialize the router
  const router = express.Router();

  // Initialize the controller with the necessary dependencies
  const controller = organizerController(
    organizerRepositoryInt,
    organizerRepositoryImp,
    organizerServiceInt,
    organizerServiceImp
  );

  // Authentication Routes
  /**
   * @route POST /authcheck
   * @desc Check organizer authentication
   * 1
   */
  router.route("/authcheck").post(controller.organizerauthentication);

  // Registration and Login Routes
  /**
   * @route POST /register
   * @desc Register a new organizer
   * 2
   */
  router.route("/register").post(controller.organizerregister);

  /**
   * @route POST /login
   * @desc Organizer login
   * 3
   */
  router.route("/login").post(controller.organizerlogin);

  /**
   * @route POST /googleauth
   * @desc Google authentication for organizer
   * 4
   */
  router.route("/googleauth").post(controller.organizergoogleauth);

  // Profile Routes
  /**
   * @route GET /profile
   * @desc Get organizer profile details
   * 5
   */
  router.route("/profile").get(controller.organizerprofile);

  /**
   * @route POST /profile
   * @desc Edit organizer profile details
   * 6
   */
  router.route("/profile").post(controller.organizerprofileedit);

  // Event Management Routes
  /**
   * @route POST /save-event
   * @desc Save a new event
   * 7
   */
  router.route("/save-event").post(controller.organizereventcreation);

  /**
   * @route GET /organizerevents
   * @desc Get all events created by the organizer
   * 7
   */
  router.route("/organizerevents").get(controller.organizerevents);

  /**
   * @route GET /event
   * @desc Get details of a single event
   * 8
   */
  router.route("/event").get(controller.organizersingleevents);

  // Ticket Management Routes
  /**
   * @route POST /event-freeticket
   * @desc Create free tickets for an event
   * 9
   */
  router.route("/event-freeticket").post(controller.freeticketcreation);

  /**
   * @route POST /event-paidticket
   * @desc Create paid tickets for an event
   * 10
   */
  router.route("/event-paidticket").post(controller.paidticketcreation);

  /**
   * @route GET /eventtickets
   * @desc Get all tickets for a specific event
   * 11
   */
  router.route("/eventtickets").get(controller.eventtickets);

  // Event Publishing Route
  /**
   * @route POST /publish-event
   * @desc Publish an event to make it live
   * 12
   */
  router.route("/publish-event").post(controller.eventchangetolive);

  // Order Management Routes
  /**
   * @route GET /order-details
   * @desc Get details of a specific order
   * 13
   */
  router.route("/order-details").get(controller.getOrderDetails);

  /**
   * @route GET /organizer-orders
   * @desc Get all orders for the organizer's events
   * 14
   */
  router.route("/organizer-orders").get(controller.getOrganizerOrders);

  /**
   * @route GET /organizer-orders-tickets
   * @desc Get tickets associated with orders
   * 16
   */
  router.route("/organizer-orders-tickets").get(controller.getOrganizerOrderstickets);

  // Check-In Routes
  /**
   * @route GET /tickets-checkin
   * @desc Update the check-in status of tickets
   * 17
   */
  router.route("/tickets-checkin").get(controller.updateticketcheckin);

  /**
   * @route GET /qrcode-checkin
   * @desc Check in attendees using a QR code
   * 18
   */
  router.route("/qrcode-checkin").get(controller.updateticketqrcodecheckin);

/**
 * @route GET /gross-sales
 * @desc Get order sales data 
 * 19
 */
  router.route("/gross-sales").get(controller.getGrossSales);

/**
 * @route GET /order-summary
 * @desc Get order summary data for charts
 * 20
 */
router.route("/order-summary").get(controller.getOrderSummary);

/**
 * @route GET /total-checkins
 * @desc Get total checkins count
 * 21
 */
router.route("/total-checkins").get(controller.getTotalCheckins);

/**
 * @route GET /ticket-stats
 * @desc Get ticket statistics
 * 22
 */
router.route("/ticket-stats").get(controller.getTicketStatistics);

// **Google Meet Integration**
  /**
   * @route POST /create-meeting-link
   * @desc Generate a Google Meet link
   * 23
   */
router.route("/create-meeting-link").post(controller.createGoogleMeetLink);

// **Invitation & Receipt**
  /**
   * @route POST /send-invitation
   * @desc Send event invitation email with meeting link
   * 24
   */
router.route("/send-invitation").post(controller.sendInvitation_Checkin);

 /**
   * @route POST /send-receipt
   * @desc Send order invoice email to user
   * 25
   */

router.route("/send-receipt").post(controller.sendOrderinvoice);

/**
   * @route PUT /update-eventevent
   * @desc Update an existing event
   * 26
   */
router.route("/update-eventevent").put(controller.organizereventedit);


router.route("/event-ticket").get(controller.geteventtickets);

 /**
   * @route PUT /event-freeticketedit
   * @desc Edit an existing free ticket
   * 27
   */
router.route("/event-freeticketedit").put(controller.eventfreeticketedit);

 /**
   * @route PUT /event-paidticketedit
   * @desc Edit an existing paid ticket
   * 28
   */
router.route("/event-paidticketedit").put(controller.eventpaidticketedit);


 /**
   * @route DELETE /event-ticket
   * @desc Delete a ticket
   * 29
   */
router.route("/event-ticket").delete(controller.eventticketdelete);


router.route("/signout").post(controller.removefcmtoken);



  return router;
};

export default organizerRouter;
