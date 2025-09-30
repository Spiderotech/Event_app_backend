import userController from "../../../../adapters/controllers/user/userController.js";
import userRepositoryImp from "../../../database/mongodb/repositories/user/userRepositoryImp.js";
import userRepositoryInt from "../../../../application/repositories/user/userRepositoryInt.js";
import userServiceImp from "../../../services/user/userServiceImp.js";
import userServiceInt from "../../../../application/services/user/userServiceInt.js";

const userRouter = (express) => {
    const router = express.Router();

    const controller = userController(userRepositoryInt, userRepositoryImp, userServiceInt, userServiceImp);

    // 1️⃣ **Authentication & User Management (4 routes)**
    /**
     * @route POST /authcheck
     * @desc Check user authentication
     * 1
     */
    router.route('/authcheck').post(controller.userauthentication);

    /**
     * @route POST /register
     * @desc Register a new user
     * 2
     */
    router.route('/register').post(controller.userregister);

    /**
     * @route POST /login
     * @desc User login
     * 3
     */
    router.route('/login').post(controller.userlogin);

    /**
     * @route POST /googleauth
     * @desc Google authentication for user
     * 4
     */
    router.route('/googleauth').post(controller.usergoogleauth);

    // 2️⃣ **Profile Management (4 routes)**
    /**
     * @route GET /profile
     * @desc Get user profile details
     * 5
     */
    router.route('/profile').get(controller.userprofile);

    /**
     * @route POST /profile
     * @desc Update user profile details
     * 6
     */
    router.route('/profile').post(controller.updateprofile);

    /**
     * @route POST /updateprofileimage
     * @desc Update user profile image
     * 7
     */
    router.route('/updateprofileimage').post(controller.updateprofileimage);

    /**
     * @route GET /organizers
     * @desc Get all organizers' profiles
     * 8
     */
    router.route('/organizers').get(controller.organizersprofile);

    // 3️⃣ **Event Management (4 routes)**
    /**
     * @route GET /getallevents
     * @desc Get all available events
     * 9
     */
    router.route('/getallevents').get(controller.allevents);

    /**
     * @route GET /getsingleevents
     * @desc Get details of a single event
     * 10
     */
    router.route('/getsingleevents').get(controller.sigleevents);

    /**
     * @route GET /events-add
     * @desc Add an event to user list
     * 11
     */
    router.route('/events-add').get(controller.allevents);

    /**
     * @route GET /organizersevents
     * @desc Get events created by organizers
     * 12
     */
    router.route('/organizersevents').get(controller.organizerevents);

    // 4️⃣ **Favorite Management (5 routes)**
    /**
     * @route POST /favorite
     * @desc Add an event to favorites
     * 13
     */
    router.route('/favorite').post(controller.addFavorite);

    /**
     * @route POST /unfavorite
     * @desc Remove an event from favorites
     * 14
     */
    router.route('/unfavorite').post(controller.removeFavorite);

    /**
     * @route GET /is-favorite
     * @desc Check if an event is favorited
     * 15
     */
    router.route('/is-favorite').get(controller.checkFavorite);

    /**
     * @route GET /user-favorite-events
     * @desc Get user's favorite events
     * 16
     */
    router.route('/user-favorite-events').get(controller.getFavorite);

    /**
     * @route GET /favorites-count
     * @desc Get total count of favorite events
     * 17
     */
    router.route('/favorites-count').get(controller.getFavoritecount);

    // 5️⃣ **Follow Organizer (5 routes)**
    /**
     * @route POST /follow
     * @desc Follow an organizer
     * 18
     */
    router.route('/follow').post(controller.followOrganizer);

    /**
     * @route POST /unfollow
     * @desc Unfollow an organizer
     * 19
     */
    router.route('/unfollow').post(controller.unfollowOrganizer);

    /**
     * @route GET /is-following
     * @desc Check if user is following an organizer
     * 20
     */
    router.route('/is-following').get(controller.checkFollowing);

    /**
     * @route GET /user-following-organizers
     * @desc Get the list of organizers a user follows
     * 21
     */
    router.route('/user-following-organizers').get(controller.getFollowing);

    /**
     * @route GET /following-count
     * @desc Get total count of followed organizers
     * 22
     */
    router.route('/following-count').get(controller.getFollowingcount);

    // 6️⃣ **Order Management (3 routes)**
    /**
     * @route POST /create-order
     * @desc Create a new order for tickets
     * 23
     */
    router.route('/create-order').post(controller.createOrder);

    /**
     * @route GET /order-details
     * @desc Get details of a specific order
     * 24
     */
    router.route('/order-details').get(controller.getOrderDetails);

    /**
     * @route GET /user-orders
     * @desc Get all orders placed by the user
     * 25
     */
    router.route('/user-orders').get(controller.getUserOrders);

    return router;
};

export default userRouter;
