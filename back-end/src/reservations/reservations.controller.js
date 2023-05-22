/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasOnlyValidProperties = require("../errors/hasValidProperties");
const hasProperties = require("../errors/hasProperties");
const reservationsService = require("./reservations.service");



const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "reservation_id",
  "updated_at",
  "created_at",
];

const requiredProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

const hasValidFields = hasOnlyValidProperties(VALID_PROPERTIES);
const hasRequiredProperties = hasProperties(...requiredProperties);

function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

function isValidReservation(req, res, next) {
  const reservation = req.body.data;
  
  if (!reservation) {
    return next({ status: 400, message: `Must have data property.` });
  }

  requiredProperties.forEach((field) => {
    if (!reservation[field]) {
      return next({ status: 400, message: `${field} field required` });
    }

    if (field === "people" && typeof reservation[field] !== "number") {
      return next({
        status: 400,
        message: `${reservation[field]} is not a number type for people field.`,
      });
    }
    if (field === "reservation_date" && !Date.parse(reservation[field])) {
      return next({ status: 400, message: `${field} is not a valid date.` });
    }
  });

  next();
}
async function listAllReservations(req, res) {
  const result = await reservationsService.listAllReservations();
  const map = result.map((element) => {return {...element, "reservation_date": element.reservation_date.toISOString().split('T')[0]}} 
  );
  res.status(200).json({data: map});
}

async function listReservationsForDate(req, res){
  const {date, mobile_number} = req.query;
  let result = [];
  const map = result.map((element) => {return {...element, "reservation_date": element.reservation_date.toISOString().split('T')[0]}} 
  );
  if(date){
    result = await reservationsService.listReservationsForDate(req.query.date);
  }
  if(mobile_number){
  result = await reservationsService.listReservationsForMobileNumber(req.query.mobile_number);
  }
  res.status(200).json({data: result.map((element) => {return {...element, "reservation_date": element.reservation_date.toISOString().split('T')[0]}} 
  )});
}

function reservationTimeIsTime(req, res, next){
  const { reservation_time } = req.body.data;
  if(reservation_time > "10:30" && reservation_time < "21:30") {
    return next();
  }
  next({
    status: 400,
    message: "Please include a valid reservation_time between 10:30 AM and 9:30 PM"
  })
}

function validateData(req, res, next) {
  const data = req.body.data;
  if(data) {
   return next();
  }
  else{next({
    status: 400,
    message: "Invalid data"
  })}
  
};

function dayIsNotTuesday(req, res, next){
  const { reservation_date } = req.body.data;
  const [year, month, day] = reservation_date.split("-");
  const date = new Date(`${month} ${day}, ${year}`);
  res.locals.date = date;
  if (date.getDay() === 2) {
    return next({ status: 400, message: "Location is closed on Tuesdays" });
  }
  next();
}

function dateIsInFuture(req, res, next){
  const { reservation_date } = req.body.data;
  const today = asDateString(new Date());
  
  if (reservation_date < today) {
    return next({ status: 400, message: "Must be a future date" });
  }
  next();
}

function checkReservationStatus(req, res, next){
  const { status } = req.body.data;
  if(status === "seated" || status === "finished") {
   next ({
      status: 400,
      message: `Reservation status is ${status}`,
    })
  }
  next()
}

function validateStatus(req, res, next) {
  const { status } = req.body.data;
  if (status === "seated" || status === "booked" || status === "finished" || status === "cancelled") {
    return next();
  }

  next({
    status: 400,
    message: `The status of ${status} cannot be accepted, please assign 'Booked', 'Seated', or 'Finished'`
  })
}

async function checkCurrentStatus(req, res, next){
  const { reservation_id } = req.params;

  const status = res.locals.reservation.status;

  if (status === "finished") {
    return next({
      status: 400,
      message: `Reservation ${reservation_id} is finished.`,
    });
  }
  next();
}


async function create(req, res) {
  const newReservation = {
    ...req.body.data,
    status: "booked",
  };
  const result = await reservationsService.createReservation(newReservation);
  res.status(201).json({ data: result});
}

const reservationExists = async (req, res, next) => {
  const { reservation_id } = req.params;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} not found.`,
  });
};

async function read(req, res) {
  const reservation = res.locals.reservation;
  res.json({ data: reservation });
}

async function update(req, res, next){
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  }

  const result = await reservationsService.update(updatedReservation);
  res.json({data: result});
}

async function cancelReservation(req, res, next){
  const { status } = req.body.data;
  const { reservation_id } = req.params;

  const result = await reservationsService.cancelReservation(reservation_id, status);
  res.status(200).json({data: result});
}

module.exports = {
  listAllReservations,
  listReservationsForDate,
  create: [
    hasValidFields, 
    hasRequiredProperties, 
    isValidReservation,
    checkReservationStatus,
    reservationTimeIsTime,
    dateIsInFuture,
    dayIsNotTuesday,
    asyncErrorBoundary(create)
  ],
  read: [
    reservationExists,
    asyncErrorBoundary(read),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasRequiredProperties, 
    isValidReservation,
    checkReservationStatus,
    reservationTimeIsTime,   
    dateIsInFuture,
    dayIsNotTuesday,
    asyncErrorBoundary(update),
  ],
  cancel: [
    asyncErrorBoundary(reservationExists),
    validateStatus,
    checkCurrentStatus,
    asyncErrorBoundary(cancelReservation), 
  ]

};
