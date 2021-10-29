# shared-trip-exam-prep
 Educational express.js application

1.	Exam rules:
1.	You have 4 hours 
2.	When you are ready, delete the node_modules folder, make sure all dependencies are listed in the package.json file and submit your archived project.
3.	You are provided with HTML & CSS resources 
4.	You may add attributes (such as class and dataset), but it is forbidden to change existing attributes (such as class and id)
5.	You may change "href" attributes on links and add/change the method and action attributes of HTML Forms.
6.	Use Express.js as a back-end framework
7.	Use MongoDB as a database with mongoose
8.	You can use whatever view engine you like (express-handlebars, EJS, Pug etc.…)
9.	Use bcrypt for hashing the password
10.	The application must start from file "index.js" on port 3000
11.	It is forbidden to use React, Vue, Angular etc.

2.	Application Overview
Get familiar with the provided HTML & CSS and create an application for shared trip's plans.
The application allows visitors to browse through the shared trips catalog. Users may register with an email, password and gender which allows them to create their own trips and should be able to join trip (if the current user is not the trip creator and if seats available). Trip authors can also edit or delete their own publications at any time.
3.	Functional Requirements
The Functional Requirements describe the functionality that the Application must support.
Guest (not logged in)
Guest navigation example: 
 
The application should provide Guest (not logged in) users with the functionality to login, register, view the Home page, Shared Trips page and the Details page.
Users (logged in)
User navigation example:
 
The application should provide Users (logged in) with the functionality to:
•	View home page and all other pages with logged-in navigation
•	View all shared trips
•	Create new trip [Offer Trip]
•	Access trip details page [Details]
•	Join some trip (if the current user is not the trip creator and if seats available)
•	Delete or Edit trip depending on user's authentication (only for creator of the current trip)
4.	Database Models
The Database of the Shared Trip application needs to support 2 entities

User
•	Email - string (required),
•	Password - string (required),
•	Gender – string (male or female) required ,
•	Trips History – a collection of Trips (reference to the Trip Model)
Note: When a user creates a new trip, a reference to that trip is added to that collection (Trips History).

Trip
•	Start Point - string (required), 
•	End Point – string (required),
•	Date – string (required),
•	Time – string (required),
•	Car Image – string (required),
•	Car Brand – string (required),
•	Seats – number (required),
•	Price – number (required),
•	Description – string (required),
•	Creator – object Id (reference to the User model),
•	Buddies – a collection of Users (reference to the User model)
Note: When a user joined the given trip, a reference to that user is added to that collection (Buddies).
Implement the entities with the correct data types.


5.	Application Pages (80 pts)
Home Page (logged out user)
  
Home Page (logged in user)
 
Register Page (logged out user)
Register a user inside the database with email, password and gender (male, female). Password inside the database must be hashed (use bcrypt) and both passwords must match! After successful registration redirect to Home page, with already logged in user.
 
Login Page (logged out user)
Logging an already registered user with correct email and password. After successful login redirect to Home page, with already logged in user.
  
Logout (logged in user)
The logout action is available to logged-in users. Upon success, clear any session information and redirect the user to Home page.
Shared Trips (for logged in users and logged out users)
List all shared trips. Each trip should be showing information about trip's car image, destination (from - to), date, time and price. Like in the picture below:
 
[Details] button should be a link to the details page for the current trip.

  
Trip Details Page - (for logged in users and logged out users)
All users should be able to view details about trip. Clicking the Details button in of a trip card should display the Details page. If the currently logged-in user is the creator of the trip, the Edit and Delete buttons should be displayed, otherwise they should not be available.
Information about the trip:
•	Destination (from - to)
•	Date and Time (date at time)
•	Shared Trip Buddies
o	If any, separate them with comma and space ", "
o	If not, display "there are no buddies yet..."
o	Below that, the email on the driver should be displayed
•	Car Brand
•	Car Image
•	Description
•	Price
•	Buttons (Depending the status of the currently logged in user)

Trip Details (logged out users)
If there are no logged in user do not show div with class "actions"
 
Trip Details (logged in user and creator of the current trip)
If the currently logged-in user is the driver (user who's created the trip), he should see the [Delete this trip] and [Edit this trip] buttons.
 
Trip Details (logged in user with available seats)
If the currently logged-in user is not the driver (user that is not the creator for that trip) and is not already joined for this trip he should see button like [Join now, {available seats} left]. If there is at least 1 seat left
 
Trip details (logged in user and already joined the trip)
If the currently logged-in user is not the driver and is already joined the current trip, he should see the [Already joined. Don't be late].
 
Trip Details (logged in user with no available seats)
If the currently logged-in user is not the driver and there are no available seats for the current trip, he should see the [No seats available!].
 

Join Trip (logged in user which is not the current trip creator)
Every logged-in user which is not the current trip creator (driver) should be able to join trip (if seats available). If he manages to join successfully to some trip, his email should be added to the current trips shared Trip buddies' collection and the seats for the current trip should be decreased by 1 and redirect the user to the Details page for the current trip.
If some user once joined a current trip, he should see the "Already joined. Don't be late!".
If there are no seats available, he should see the "No seats available!".

Offer New Trip Page (logged in user)
The Create (Offer trip) page is available to logged-in users. It contains a form for adding new trip. Upon success, redirect the user to the Shared Trips page.
 
Delete Trip (logged in user and creator of the current trip) 
Every trip creator should be able to click over [Delete this trip] button - deleting the current trip from the database and the user should be redirected to Shared Trips Page.

Edit Trip (logged in user and creator of the current trip)
The Edit page is available to logged-in users and it allows authors to edit their own trip. Clicking the [Edit this trip] button of a particular trip on the Details page should display the Edit Trip page, with all fields filled with the data for the trip. It contains a form with input fields for all relevant properties. Upon success, redirect the user to the Details page for the current trip.
 
6.	Security Requirements (Routes Guards) - (10 pts)
The Security Requirements are mainly access requirements. Configurations about which users can access specific functionalities and pages.
•	Guest (not logged in) users can access Home page.
•	Guest (not logged in) users can access Login page and functionality.
•	Guest (not logged in) users can access Register page and functionality.
•	Guest (not logged in) and Users (logged in) can access Shared Trips page (Listed all trips).
•	Guest (not logged in) can access the Details page without functionality.
•	Users (logged in) can access Home page.
•	Users (logged in) can access the Details page and functionality.
•	Users (logged in) can access Offer Trip page and functionality.
•	Users (logged in) can access to Join trip functionality.
•	Users (logged in and creator of the current trip) can access Delete and Edit trip functionality. 
•	Users (logged in) can access Logout functionality.
If Guests (not logged in) trying to access а page that it should not be able to, you must redirect them to Login page.
If Users (logged in) trying to access а page that it should not be able to, you must redirect them to Home page.

Use the following view for invalid paths:
 
7.	Validation and Error Handling (10 pts)
The application should notify the users about result of their actions.
In case of error, you should display div with class "error"
You can choose to display the first error or all of them. You have complete freedom to choose the content of the error message you will display.

Login / Register
You should make the following validations:
•	The email should be in the following format (mailboxname @ domainname) - "username@domain.bg"
•	The password should be at least 4 characters long
•	The repeat password should be equal to the password
   
Trip
You should make the following validations while offering and editing trip:
•	The Starting Point and End Point should be at least 4 characters long (each).
•	The Seats should be positive number (from 0 to 4 inclusive).
•	The Description should be minimum 10 characters long.
•	The Car Image should be starts with http:// or https://.
•	The Car Brand should be minimum 4 characters long.
•	The Price should be positive number (from 1 to 50 inclusive).

 
8.	Bonus - Profile page (10 pts)
Each logged-in user should be able to view his own profile by clicking [Profile]. Email, trips count and information about the trips with the data for the current user should be filled. Note that the Gender of the user determines which picture is displayed as their avatar.
