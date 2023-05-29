# Thinkful Capstone: Restaurant Reservation System

Front-end Live at: https://restaurant-reservation-zijp.vercel.app/search

Back-end Live at: https://restaurant-reservation-rosy.vercel.app/tables


**A full-stack app built using:**

HTML <br/>
CSS <br/>
JavaScript <br/>
React <br/>
Express <br/>
Knex <br/>
PostgreSQL API

**Available API Endpoints**

<img width="801" alt="Screenshot 2023-05-29 at 11 22 57 AM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/d3428675-7b04-46cc-a8dc-f5c4294e9370">



**App Functionality**

**Dashboard**

Defaults to displaying a list of booked (or seated) reservations for the current date. <br/>
Navigation buttons: Previous Day, Today, & Next Day are available for changing the date displayed by the dashboard. <br/>
All tables (free or occupied) are also diplayed here.

<img width="1405" alt="Screenshot 2023-05-29 at 11 24 44 AM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/c9fe044c-4f29-4ac0-9e36-4e635559c728">

**New Reservation**

1.Fill out the form with the reservation information and click submit.

<img width="1390" alt="Screenshot 2023-05-29 at 11 27 06 AM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/ae655138-1a61-4b84-b4cd-a2620f907cd7">

**New Table**

1.Fill out the form with the table information and click submit.

<img width="1385" alt="Screenshot 2023-05-29 at 11 35 36 AM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/081e6034-bd04-40b0-a1ab-3811bceaba60">

**Seating a Reservation**

1.Click seat on the reservation you'd like to seat. <br/>
<img width="598" alt="Screenshot 2023-05-29 at 11 49 41 AM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/a51ec8ff-0a5f-4264-a3eb-c76afb4fc61e">


2.Select a table from the drop-down menu. <br/>
3.Click submit to seat the reservation at the selected table.

<img width="1070" alt="Screenshot 2023-05-29 at 11 51 59 AM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/2b089d86-3ad9-40e3-857e-95555940cf6d">


4.Once a reservation is seated: <br/>
	i.The reservation status will change from booked to seated. <br/>
	ii.The table status will change from free to occupied




| <img width="580" alt="Screenshot 2023-05-29 at 11 55 37 AM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/82acf684-4536-40df-bf07-2e1f41208895">  | <img width="568" alt="Screenshot 2023-05-29 at 11 56 38 AM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/8e41569f-9dc4-45ae-8bb1-7de1e23aefb4"> |
| ------------- | ------------- |

**Finishing a Reservation**

1.Click finish on the table that has finished. <br/>


| <img width="567" alt="Screenshot 2023-05-29 at 12 01 23 PM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/6284f79b-e949-44d8-ad20-2c01f8bf3c5f"> | <img width="925" alt="Screenshot 2023-05-29 at 12 02 50 PM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/d630d17a-93ce-4638-afee-cf5b71d22a42">|
| ------------- | ------------- |

2.Click OK on the confirmation window that pops-up. <br/>
3.Table status is now free to seat other reservations <br/>
Note: finished reservations no longer display in the dashboard.

**Editing a Reservation**

1.Click edit on the reservation you'd like to edit. <br/>

<img width="573" alt="Screenshot 2023-05-29 at 12 05 49 PM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/3956cbb2-1d02-4edd-8314-20c69ef58585">

2.Edit any of the reservation information as needed. <br/>
3.Click submit to save the updated reservation information. 

<img width="1383" alt="Screenshot 2023-05-29 at 12 07 22 PM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/00e5739d-1f25-44ea-be73-2b214173d2bb">

**Cancelling a Reservation**


1.Click cancel on the reservation you'd like to cancel. <br/>

<img width="576" alt="Screenshot 2023-05-29 at 12 08 21 PM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/969c5ca1-f804-436f-89a1-82f6c82f32ad">

2.Click OK on the confirmation window that pops-up.

<img width="717" alt="Screenshot 2023-05-29 at 12 10 13 PM" src="https://github.com/mhatrekanchan01/restaurant-reservation/assets/61965511/8caede2e-8fca-4e1f-861a-9855f06b3dc0">

Note: cancelled reservations no longer display in the dashboard.

**Installation**

1.Fork and clone this repository. <br/>
2.Run cp ./back-end/.env.sample ./back-end/.env. <br/>
3.Update the ./back-end/.env file with the connection URL's to your database instance. <br/>
4.Run cp ./front-end/.env.sample ./front-end/.env. <br/>
5.Include your backend connection within ./front-end/.env (defaults to http://localhost:5000). <br/>
6.Run npm install to install project dependencies. <br/>
7.Run npm run start to start the server. <br/>
8.If you have trouble getting the server to run, reach out for assistance.
