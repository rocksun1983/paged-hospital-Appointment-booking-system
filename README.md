# -hospital-Appointment-booking-system
The PAGED Hospital Appointment Booking System is a full-stack web application that allows patients to register and login, book doctor appointments, make payments via pay stacks, view and manage bookings, It also provides an Admin panel to manage slots and monitor appointments

Objectives
•	Eliminate manual appointment booking
•	Enable online payment integration
•	Improve scheduling efficiency
•	Provide real-time booking updates
•	Enhance patient experience

Features
	User registration/login
	Admin slot creation
	Booking with payment
	Email confirmation
	Google Calendar event
	Admin dashboard endpoint
	ESM Module
	Beautiful UI base


Technologies Used
*	Frontend
•	React.js (Vite)
•	Axios (API calls)
•	React Router DOM (Routing)
•	React Calendar
•	Paystack Inline Payment
*	Backend
•	Node.js
•	Express.js
*Database
•	MongoDB (Mongoose ODM)
*Authentication
•	JSON Web Tokens (JWT)


System Architecture
Frontend (React)
        ↓
REST API (Express.js)
        ↓
Database MongoDB

USER FEATURES
✅ Registration & Login
•	Secure authentication using JWT
✅ Dashboard
•	View appointment statistics
•	Calendar view
•	Available slots
✅ Book Appointment
•	Select doctor
•	Choose time slot
•	Make payment via Paystack
✅ My Bookings
•	View all appointments
•	Cancel appointment
•	See payment status


✅Admin Features
•	Create slots
•	View all appointments
•	Delete unused slots
•	Monitor users’ bookings


✅Payment Integration (Paystack)


✅ Database Models


✅10. API Endpoints
 Auth
•	POST /api/auth/register
•	POST /api/auth/login
 Booking
•	GET /api/book/all-slots
•	POST /api/book/:slotId
Patient
•	GET /api/patient/appointments
•	DELETE /api/patient/appointments/:id
Admin
•	POST /api/admin/slots
•	GET /api/admin/appointments

✅ Booking Flow
1.	User selects slot
2.	Payment popup opens
3.	Payment successful
4.	Backend:
o	Validates slot
o	Marks slot as booked
o	Saves appointment
5.	UI updates automatically


✅Security Features
•	JWT authentication
•	Protected routes
•	Admin authorization
•	Input validation
•	Token verification middleware

SIMPLE STEPS TO START THE WEB APP
*Git clone https://github.com/rocksun1983/paged-hospital-Appointment-booking-system.git
*Start mongoDB
* Navigate to backend folder by typing this command on terminal:	cd backend
*then type this command to start backend: npx nodemon index.js
*	Navigate to frontend folder by typing this command on terminal:cd frontend
*then type this command to start frontend:	npm run dev
*use the IP Address to open it on browser

Note: To create admin account, first and most register as user, then on the database (MONGODB) change it to admin for  security reason, that will give you access to open admin dashboard



