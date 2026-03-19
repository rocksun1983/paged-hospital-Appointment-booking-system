PAGED Hospital Appointment Booking System is a full-stack web application that allows patients to register and login, book doctor appointments, make payments (via Paystack), view and manage bookings, It also provides an Admin panel to manage slots and monitor appointments

Objectives
•	Eliminate manual appointment booking
•	Enable online payment integration
•	Improve scheduling efficiency
•	Provide real-time booking updates
•	Enhance patient experience

Features
*User registration/login
*Admin slot creation
*Booking with payment
*	Email confirmation
*Google Calendar event
*	Admin dashboard endpoint
*	ESM Module
*	Beautiful UI base

Technologies Used
	Frontend
•	React.js (Vite)
•	Axios (API calls)
•	React Router DOM (Routing)
•	React Calendar
•	Paystack Inline Payment
	Backend
•	Node.js
•	Express.js
	Database
•	MongoDB (Mongoose ODM)

	Authentication
•	JSON Web Tokens (JWT)

System Architecture
•	Frontend (React)
•	REST API (Express.js)
•	Database MongoDB


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
•	Payment handled via Paystack inline popup

✅API Endpoints
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

STEPS TO START THE WEB APP
	Git clone https://github.com/rocksun1983/paged-hospital-Appointment-booking-system.git 
	Start mongoDB
	On your terminal to start backend, type this command: cd backend
	Then type this command: npx nodemon index.js
	On the terminal to start frontend, type this command: cd frontend
	Then type this command: npm run dev
	use the provided IP Address to open it on browser

Note: To create admin account, first and most register as user, then on the database change it to admin for  security reason, that will give you access to open admin dashboard or use this temporary: email: admin@gmail.com password:admin123

Website:https://appointmentbooking-roan.vercel.app/
