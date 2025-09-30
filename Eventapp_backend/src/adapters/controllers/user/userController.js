import Verifyemail from "../../../application/useCase/user/Verifyemail.js"
import Login from "../../../application/useCase/user/Login.js"
import Googleauth from "../../../application/useCase/user/Googleauth.js"
import Createuser from "../../../application/useCase/user/Createuser.js"
import Getalleventbylocation from "../../../application/useCase/user/Getalleventbylocation.js"
import Getsingleevent from "../../../application/useCase/user/Getsingleevent.js"
import Getprofile from "../../../application/useCase/user/Getprofile.js"
import Editorganizerprofile from "../../../application/useCase/user/Editorganizerprofile.js"
import AddFavorite from "../../../application/useCase/user/AddFavorite.js";
import RemoveFavorite from "../../../application/useCase/user/RemoveFavorite.js";
import CheckFavorite from "../../../application/useCase/user/CheckFavorite.js";
import FollowOrganizer from "../../../application/useCase/user/FollowOrganizer.js";
import UnfollowOrganizer from "../../../application/useCase/user/UnfollowOrganizer.js";
import CheckFollowing from "../../../application/useCase/user/CheckFollowing.js";
import Getorganizerprofile from "../../../application/useCase/user/Getorganizerprofile.js"
import Getorganizerevents from "../../../application/useCase/user/Getorganizerevents.js"
import GetFavoriteevents from "../../../application/useCase/user/GetFavoriteevents.js"
import GetFollowingorganizer from "../../../application/useCase/user/GetFollowingorganizer.js"
import Getfavoritecount from "../../../application/useCase/user/Getfavoritecount.js"
import Getfollowingcount from "../../../application/useCase/user/Getfollowingcount.js"
import CreatenewOrder from "../../../application/useCase/user/CreatenewOrder.js"
import GetorderTickets from "../../../application/useCase/user/GetorderTickets.js"
import GetuserOrder from "../../../application/useCase/user/GetuserOrder.js"

const userController = (userRepositoryInt, userRepositoryImp, userServiceInt, userServiceImp) => {

    const dbrepository = userRepositoryInt(userRepositoryImp())
    const authService = userServiceInt(userServiceImp())

    const userauthentication = (req, res) => {
        const { email } = req.body

        Verifyemail(email, dbrepository).then((response) => {

            res.json(response)


        }).catch((err) => console.log(err))


    }

    const userlogin = (req, res) => {
        const { email, password, fcmtoken } = req.body
        Login(email, password, fcmtoken, dbrepository, authService).then((response) => {
            console.log(response, "login");
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const userregister = (req, res) => {

        const { fullname, email, password, fcmtoken } = req.body
        Createuser(fullname, email, password, fcmtoken, dbrepository, authService).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))




    }

    const usergoogleauth = (req, res) => {

        const { fullName, email, image, fcmtoken } = req.body
        Googleauth(fullName, email, image, fcmtoken, dbrepository, authService).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))




    }

    const updateprofile = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");
        const { name, profileImage } = req.body
        console.log(name, profileImage);

        Editorganizerprofile(Id, name, profileImage, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const updateprofileimage = (req, res) => {
        const { eventId } = req.body;
        Publishevent(eventId, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const allevents = (req, res) => {
        const { location } = req.query;
        console.log(location);

        Getalleventbylocation(location, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const sigleevents = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        Getsingleevent(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const userprofile = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");
        Getprofile(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    // Add to favorites
    const addFavorite = (req, res) => {
        const { userId, eventId } = req.body;
        AddFavorite(userId, eventId, dbrepository)
            .then((response) => res.json(response))
            .catch((err) => console.log(err));
    };

    // Remove from favorites
    const removeFavorite = (req, res) => {
        const { userId, eventId } = req.body;

        RemoveFavorite(userId, eventId, dbrepository)
            .then((response) => res.json(response))
            .catch((err) => console.log(err));
    };

    // Check if favorite
    const checkFavorite = (req, res) => {
        const { userId, eventId } = req.query;
        console.log(userId, eventId);
        

        CheckFavorite(userId, eventId, dbrepository)
            .then((response) => res.json(response))
            .catch((err) => console.log(err));
    };

    // Follow organizer
    const followOrganizer = (req, res) => {
        const { userId, organizerId } = req.body;

        FollowOrganizer(userId, organizerId, dbrepository)
            .then((response) => res.json(response))
            .catch((err) => console.log(err));
    };

    // Unfollow organizer
    const unfollowOrganizer = (req, res) => {
        const { userId, organizerId } = req.body;

        UnfollowOrganizer(userId, organizerId, dbrepository)
            .then((response) => res.json(response))
            .catch((err) => console.log(err));
    };

    // Check if following
    const checkFollowing = (req, res) => {
        const { userId, organizerId } = req.query;
        console.log(userId, organizerId);

        CheckFollowing(userId, organizerId, dbrepository)
            .then((response) => res.json(response))
            .catch((err) => console.log(err));
    };


    const organizersprofile = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");
        Getorganizerprofile(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const organizerevents = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        Getorganizerevents(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const getFavorite = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        GetFavoriteevents(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const getFollowing = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        GetFollowingorganizer(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const getFavoritecount = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        Getfavoritecount(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const getFollowingcount = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        Getfollowingcount(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const createOrder = (req, res) => {
        const {
            userId,
            eventId,
            contactInformation,
            tickets,
            isPaid,
            paymentMethod,
            paidAmount,
            fee,
            paymentId,
        } = req.body;
        console.log(userId,
            eventId,
            contactInformation,
            tickets,
            isPaid,
            paymentMethod,
            paidAmount,
            fee,
            paymentId,);
        

        CreatenewOrder( userId,
            eventId,
            contactInformation,
            tickets,
            isPaid,
            paymentMethod,
            paidAmount,
            fee,
            paymentId,dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }

    const getUserOrders = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        GetuserOrder(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }


    const getOrderDetails = (req, res) => {
        const Id = req.query.id;
        console.log(Id, "auth");

        GetorderTickets(Id, dbrepository).then((response) => {
            console.log(response);
            res.json(response)

        }).catch((err) => console.log(err))

    }



    return {
        userauthentication,
        userlogin,
        userregister,
        usergoogleauth,
        userprofile,
        updateprofile,
        updateprofileimage,
        allevents,
        sigleevents,
        addFavorite,
        removeFavorite,
        checkFavorite,
        followOrganizer,
        unfollowOrganizer,
        checkFollowing,
        organizersprofile,
        organizerevents,
        getFavorite,
        getFollowing,
        getFavoritecount,
        getFollowingcount,
        createOrder,
        getUserOrders,
        getOrderDetails


    }
}

export default userController
