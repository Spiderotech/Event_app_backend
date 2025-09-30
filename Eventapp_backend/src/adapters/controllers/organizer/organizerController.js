import Verifyemail from "../../../application/useCase/organizer/Verifyemail.js"
import Createorganizer from "../../../application/useCase/organizer/Createorganizer.js"
import Login from "../../../application/useCase/organizer/Login.js"
import Googleauth from "../../../application/useCase/organizer/Googleauth.js"
import Getprofile from "../../../application/useCase/organizer/Getprofile.js"
import Editorganizerprofile from "../../../application/useCase/organizer/Editorganizerprofile.js"
import Cretaeevent from "../../../application/useCase/organizer/Cretaeevent.js"
import Getorganizerevents from "../../../application/useCase/organizer/Getorganizerevents.js"
import Getsingleevent from "../../../application/useCase/organizer/Getsingleevent.js"
import Freeticketcreation from "../../../application/useCase/organizer/Freeticketcreation.js"
import Paidticketcreation from "../../../application/useCase/organizer/Paidticketcreation.js"
import Geteventtickets from "../../../application/useCase/organizer/Geteventtickets.js"
import Publishevent from "../../../application/useCase/organizer/Publishevent.js"
import GetorderDetails from "../../../application/useCase/organizer/GetorderDetails.js"
import GetorganizerOrder from "../../../application/useCase/organizer/GetorganizerOrder.js"
import GetorganizerOrdertickets from "../../../application/useCase/organizer/GetorganizerOrdertickets.js"
import Updateticketqrcodecheckin from "../../../application/useCase/organizer/Updateticketqrcodecheckin.js"
import Updateticketcheckin from "../../../application/useCase/organizer/Updateticketcheckin.js"
import GetGrossSales from "../../../application/useCase/organizer/GetGrossSales.js"
import GetOrderSummary from "../../../application/useCase/organizer/GetOrderSummary.js"
import GetTotalCheckins from "../../../application/useCase/organizer/GetTotalCheckins.js"
import GetTicketStatistics from "../../../application/useCase/organizer/GetTicketStatistics.js"
import CreateGoogleMeetLink from "../../../application/useCase/organizer/CreateGoogleMeetLink.js"
import SendEventInvitation from "../../../application/useCase/organizer/SendEventInvitation.js"
import SendOrderInvoice from "../../../application/useCase/organizer/SendOrderInvoice.js"
import Updateevent from "../../../application/useCase/organizer/Updateevent.js"
import EventTickets from "../../../application/useCase/organizer/EventTickets.js"
import Freeticketedit from "../../../application/useCase/organizer/Freeticketedit.js"
import Paidticketedit from "../../../application/useCase/organizer/Paidticketedit.js"
import EventTicketdeletion from "../../../application/useCase/organizer/EventTicketdeletion.js"
import Logout from "../../../application/useCase/organizer/Logout.js"

/**
 * Organizer Controller - Handles all API requests related to organizers.
 *
 * @param {Function} organizerRepositoryInt - Organizer repository interface
 * @param {Function} organizerRepositoryImp - Organizer repository implementation
 * @param {Function} organizerServiceInt - Organizer service interface
 * @param {Function} organizerServiceImp - Organizer service implementation
 * @returns {Object} Controller methods
 */

const organizerController = (organizerRepositoryInt, organizerRepositoryImp, organizerServiceInt, organizerServiceImp) => {

    const dbrepository = organizerRepositoryInt(organizerRepositoryImp())
    const authService = organizerServiceInt(organizerServiceImp())


// 1️⃣ Organizer Authentication

    const organizerauthentication = (req, res) => {
        const { email } = req.body

        Verifyemail(email, dbrepository).then((response) => {

            res.json(response)


        }).catch((err) => console.log(err))


    }


    // 2️⃣ Organizer Login

    const organizerlogin = (req, res) => {
        const { email, password, fcmToken } = req.body
        Login(email, password, fcmToken, dbrepository, authService).then((response) => {
            console.log(response, "login");
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const organizerregister = (req, res) => {

        const { fullname, email, password, fcmToken } = req.body
        Createorganizer(fullname, email, password, fcmToken, dbrepository, authService).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))




    }

    const organizergoogleauth = (req, res) => {

        const { fullName, email, image, fcmtoken } = req.body
        Googleauth(fullName, email, image, fcmtoken, dbrepository, authService).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))




    }

    const organizerprofile = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        Getprofile(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const organizerprofileedit = (req, res) => {

        const Id = req.query.id;
        console.log(Id, "auth");
        const { name, about, profileImage } = req.body
        console.log(name, about, profileImage);

        Editorganizerprofile(Id, name, about, profileImage, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))




    }
    const organizereventcreation = (req, res) => {

        const {
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
        } = req.body;

        console.log(title,
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

        Cretaeevent(title,
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
            userId, dbrepository).then((response) => {
                console.log(response);
                res.json(response)

            }).catch((err) => console.log(err))




    }


    const organizerevents = (req, res) => {
        const Id = req.query.userId;
        console.log(Id, "auth");

        Getorganizerevents(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const organizersingleevents = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        Getsingleevent(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const freeticketcreation = (req, res) => {
        const {
            name,
            description,
            quantity,
            salesStartDate,
            salesEndDate,
            eventId
        } = req.body;

        Freeticketcreation(name,
            description,
            quantity,
            salesStartDate,
            salesEndDate,
            eventId, dbrepository).then((response) => {
                console.log(response);
                res.json(response)

            }).catch((err) => console.log(err))

    }

    const paidticketcreation = (req, res) => {
        const {
            name,
            description,
            quantity,
            price,
            fees,
            salesStartDate,
            salesEndDate,
            eventId
        } = req.body;

        Paidticketcreation(name,
            description,
            quantity,
            price,
            fees,
            salesStartDate,
            salesEndDate,
            eventId, dbrepository).then((response) => {
                console.log(response);
                res.json(response)

            }).catch((err) => console.log(err))

    }

    const eventtickets = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        Geteventtickets(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const eventchangetolive = (req, res) => {
        const { eventId } = req.body;
        Publishevent(eventId, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const getOrganizerOrders = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        GetorganizerOrder(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const getOrderDetails = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        GetorderDetails(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const getOrganizerOrderstickets = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        GetorganizerOrdertickets(Id, dbrepository).then((response) => {
            console.log(response.orderdata.tickets);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const updateticketcheckin = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth update");

        Updateticketcheckin(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const updateticketqrcodecheckin = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        GetorganizerOrdertickets(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const getGrossSales = (req, res) => {
        const eventId = req.query.eventId;
        GetGrossSales(eventId, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };

    const getOrderSummary = (req, res) => {
        const eventId = req.query.eventId;
        GetOrderSummary(eventId, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };

    const getTotalCheckins = (req, res) => {
        const eventId = req.query.eventId;
        GetTotalCheckins(eventId, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };

    const getTicketStatistics = (req, res) => {
        const eventId = req.query.eventId;
        GetTicketStatistics(eventId, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };

    const createGoogleMeetLink = (req, res) => {
        const eventId = req.query.id;
        CreateGoogleMeetLink(eventId, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };

    const sendInvitation_Checkin = (req, res) => {
        const {
            eventId,
            ticketId
        } = req.body;
        console.log(eventId,ticketId);
        SendEventInvitation(eventId,ticketId, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };


    const sendOrderinvoice = (req, res) => {
        const {
            orderId,
            sendTickets
        } = req.body;
        console.log(orderId,sendTickets);
        SendOrderInvoice(orderId,sendTickets, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };


    const organizereventedit = (req, res) => {

        const {
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
        } = req.body;
        const eventId = req.query.id;
        console.log(eventId);
        

        console.log(title,
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

            Updateevent(title,
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
            userId,eventId, dbrepository).then((response) => {
                console.log(response);
                res.json(response)

            }).catch((err) => console.log(err))




    }



    const geteventtickets = (req, res) => {
        const eventId = req.query.eventId;
        const ticketId = req.query.ticketId;
        console.log(eventId,ticketId);
        EventTickets(eventId,ticketId, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };



    const eventfreeticketedit = (req, res) => {
        const eventId = req.query.eventId;
        const ticketId = req.query.ticketId;
        const {
            name,
            description,
            quantity,
            salesStartDate,
            salesEndDate,
        } = req.body;

        console.log(eventId,ticketId);
        Freeticketedit(eventId,ticketId,name,
            description,
            quantity,
            salesStartDate,
            salesEndDate, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };


    const eventpaidticketedit = (req, res) => {
        const eventId = req.query.eventId;
        const ticketId = req.query.ticketId;
        const {
            name,
            description,
            quantity,
            price,
            fees,
            salesStartDate,
            salesEndDate,
        } = req.body;

        console.log(eventId,ticketId);
        Paidticketedit(eventId,ticketId,name,
            description,
            quantity,
            price,
            fees,
            salesStartDate,
            salesEndDate, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };



    const eventticketdelete = (req, res) => {
        const eventId = req.query.eventId;
        const ticketId = req.query.ticketId;
        console.log(eventId,ticketId);
        EventTicketdeletion(eventId,ticketId, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))
    };


    const removefcmtoken = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        Logout(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    return {
        organizerauthentication,
        organizergoogleauth,
        organizerregister,
        organizerlogin,
        organizerprofile,
        organizerprofileedit,
        organizereventcreation,
        organizerevents,
        organizersingleevents,
        freeticketcreation,
        paidticketcreation,
        eventtickets,
        eventchangetolive,
        getOrganizerOrders,
        getOrderDetails,
        getOrganizerOrderstickets,
        updateticketcheckin,
        updateticketqrcodecheckin,
        getGrossSales,
        getOrderSummary,
        getTotalCheckins,
        getTicketStatistics,
        createGoogleMeetLink,
        sendInvitation_Checkin,
        sendOrderinvoice,
        organizereventedit,
        geteventtickets,
        eventfreeticketedit,
        eventpaidticketedit,
        eventticketdelete,
        removefcmtoken


    }
}

export default organizerController
