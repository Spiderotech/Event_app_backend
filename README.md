# Eventapp Backend

Node.js, Express, and MongoDB backend for the Event App platform. This service powers both mobile applications:

- Attendee app: `../Event_app`
- Organizer app: `../Event_organizer_app`

The backend handles authentication, profiles, event discovery, event creation, ticket creation, orders, check-in, favorites, follows, email workflows, Google Meet links, and S3 upload URLs.

## Tech Stack

- Node.js with ES modules
- Express.js
- MongoDB and Mongoose
- JWT authentication
- bcrypt password hashing
- Nodemailer
- Google APIs
- AWS S3 presigned upload URLs
- PDFKit
- QRCode
- Morgan and CORS middleware

## Folder Structure

```text
Eventapp_backend/
├── app.js
├── package.json
└── src/
    ├── adapters/
    │   └── controllers/          # HTTP request/response handlers
    ├── application/
    │   ├── repositories/         # Repository interfaces
    │   ├── services/             # Service interfaces
    │   └── useCase/              # Business use cases
    ├── config/                   # Environment config
    ├── entities/                 # Entity-level user/organizer data helpers
    └── framework/
        ├── database/             # DB connection, models, repository implementations
        ├── services/             # Service implementations
        └── webserver/            # Express config, server config, routes
```

## Architecture

The backend uses a layered structure:

- `framework/webserver` receives HTTP traffic and registers routes.
- `adapters/controllers` convert HTTP requests into use-case calls.
- `application/useCase` contains business logic.
- `application/repositories` and `application/services` define interfaces.
- `framework/database/mongodb/repositories` implements persistence.
- `framework/services` implements infrastructure services.
- `framework/database/mongodb/models` defines Mongoose schemas.

This keeps route handling, business logic, and database access separated.

## Startup Flow

`app.js` is the backend entry point.

1. Creates an Express app.
2. Creates an HTTP server.
3. Applies middleware from `src/framework/webserver/express.js`.
4. Loads environment variables through `src/config/config.js`.
5. Connects to MongoDB through `src/framework/database/connection.js`.
6. Registers routes from `src/framework/webserver/routes/index.js`.
7. Starts the server through `src/framework/webserver/server.js`.

## Environment Variables

Create `.env` inside `Eventapp_backend`.

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/event_app
ACCESS_TOKEN_SECRET=replace_with_access_token_secret
REFRESH_TOKEN_SECRET=replace_with_refresh_token_secret
S3_ACCESS_KEY=replace_with_s3_access_key
S3_SECRET_KEY=replace_with_s3_secret_key
GOOGLE_CLIENT_ID=replace_with_google_client_id
GOOGLE_CLIENT_SECRET=replace_with_google_client_secret
GOOGLE_REFRESH_TOKEN=replace_with_google_refresh_token
GOOGLE_REDIRECT_URI=replace_with_google_redirect_uri
EMAIL_USER=replace_with_email_address
EMAIL_PASS=replace_with_email_app_password
```

Important note: `src/config/config.js` exposes `S3_ACCESS_KEY`, but `src/application/useCase/commonservice/FileuploadingUrl.js` currently references `config.S3_ACESS_KEY`. The spelling should be aligned before using S3 upload URLs.

## Installation

```bash
npm install
```

## Running

```bash
npm start
```

The `start` script runs:

```bash
nodemon app.js
```

The server listens on the `PORT` value from `.env`.

## API Base Paths

All routes are mounted under `/api/v1`.

| Base Path | Description |
| --- | --- |
| `/api/v1/user` | Attendee APIs |
| `/api/v1/organizer` | Organizer APIs |
| `/api/v1/service` | Shared service APIs |

## User Routes

Base path: `/api/v1/user`

Authentication:

- `POST /authcheck`
- `POST /register`
- `POST /login`
- `POST /googleauth`

Profile:

- `GET /profile`
- `POST /profile`
- `POST /updateprofileimage`
- `GET /organizers`

Events:

- `GET /getallevents`
- `GET /getsingleevents`
- `GET /events-add`
- `GET /organizersevents`

Favorites:

- `POST /favorite`
- `POST /unfavorite`
- `GET /is-favorite`
- `GET /user-favorite-events`
- `GET /favorites-count`

Following:

- `POST /follow`
- `POST /unfollow`
- `GET /is-following`
- `GET /user-following-organizers`
- `GET /following-count`

Orders:

- `POST /create-order`
- `GET /order-details`
- `GET /user-orders`

## Organizer Routes

Base path: `/api/v1/organizer`

Authentication:

- `POST /authcheck`
- `POST /register`
- `POST /login`
- `POST /googleauth`
- `POST /signout`

Profile:

- `GET /profile`
- `POST /profile`

Events:

- `POST /save-event`
- `GET /organizerevents`
- `GET /event`
- `POST /publish-event`
- `PUT /update-eventevent`

Tickets:

- `POST /event-freeticket`
- `POST /event-paidticket`
- `GET /eventtickets`
- `GET /event-ticket`
- `PUT /event-freeticketedit`
- `PUT /event-paidticketedit`
- `DELETE /event-ticket`

Orders and analytics:

- `GET /order-details`
- `GET /organizer-orders`
- `GET /organizer-orders-tickets`
- `GET /gross-sales`
- `GET /order-summary`
- `GET /ticket-stats`

Check-in:

- `GET /tickets-checkin`
- `GET /qrcode-checkin`
- `GET /total-checkins`

Communication:

- `POST /create-meeting-link`
- `POST /send-invitation`
- `POST /send-receipt`

## Shared Service Routes

Base path: `/api/v1/service`

- `GET /s3service` - Returns a presigned S3 upload URL.

## Database Models

### User

Stores attendee account and preference data.

Key fields:

- `name`
- `email`
- `password`
- `profileImage`
- `loginMethod`
- `settings.notifications`
- `fcmToken`
- `following`
- `favorites`

### Organizer

Stores organizer profile and follower data.

Key fields:

- `name`
- `email`
- `password`
- `profileImage`
- `about`
- `loginMethod`
- `fcmToken`
- `otp`
- `otpExpiration`
- `followers`

### Event

Stores event details, location, status, media, and embedded ticket types.

Key fields:

- `title`
- `description`
- `startDate`
- `endDate`
- `locationType`
- `location`
- `eventType`
- `eventCategory`
- `refundPolicy`
- `privacy`
- `image`
- `status`
- `meetLink`
- `tickets`
- `createdBy`

### Order

Stores attendee registrations or ticket purchases.

Key fields:

- `orderId`
- `userId`
- `eventId`
- `contactInformation`
- `tickets`
- `isPaid`
- `paymentMethod`
- `paymentId`
- `paidAmount`
- `fee`

### Ticket

Stores issued ticket instances and check-in status.

Key fields:

- `ticketId`
- `orderId`
- `eventId`
- `eventTicketId`
- `name`
- `email`
- `price`
- `isUsed`

## Development Notes

- Add new route definitions in `src/framework/webserver/routes`.
- Add controller behavior in `src/adapters/controllers`.
- Keep business logic inside `src/application/useCase`.
- Keep MongoDB access inside repository implementations.
- Use `.env` for secrets and local configuration.
- The backend currently has no test script; add one before introducing automated backend tests.
