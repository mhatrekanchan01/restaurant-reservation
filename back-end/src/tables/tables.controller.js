/**
 * List handler for reservation resources
 */
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
 const service = require("./tables.service");
 const reservationsService = require("../reservations/reservations.service");
 const hasOnlyValidProperties = require("../errors/hasValidProperties");
 const hasProperties = require("../errors/hasProperties");

 const VALID_PROPERTIES = [
  "table_name",
  "capacity",
  "reservation_id"
];

const requiredProperties = [
  "table_name",
  "capacity",
];
 
const hasValidFields = hasOnlyValidProperties(VALID_PROPERTIES);
const hasRequiredProperties = hasProperties(...requiredProperties);


function validateTableName(req, res, next) {
  const { table_name } = req.body.data;
  if(table_name && table_name.length >= 2) {
      return next();
  }
  next ({
      status: 400,
      message: "Please include a table_name that is longer than 1 character"
  });
};

function validateCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if(capacity && capacity > 0 && Number.isInteger(capacity)) {
      return next();
  }
  next({
      status: 400,
      message: "Please include a numbered seating capacity greater than 0"
  });
};


 async function listAllTables(req, res){
   const result = await service.listAllTables();
   res.status(200).json({data: result});
 }

 const hasRequiredDataProperties = (req, res, next) => {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Body must contain data" });
};

function hasReservationIdfunction (req, res, next) {
  if (req.body.data.reservation_id === null) {
   return next({
      status: 400, message: "Reservation_id is missing"
    });
  }
  next();
};

function validateReservationId(req, res, next) {
  const reservationId = req.body.data.reservation_id;

  if(reservationId) {
    return next();
  }

  next({
      status: 400,
      message: "Please include a valid reservation_id"
  })
}
 async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.readTable(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table_id ${table_id} does not exist.`,
  });
}



async function reservationExists(req, res, next) {
  
  const reservationId = req.body.data.reservation_id;
  if(!reservationId){
    return next ({
      status: 400,
      message: `reservation_id is missing`,
    })
  }
  const reservation = await reservationsService.read(reservationId);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation_id ${reservationId} does not exist.`,
  });
}




function checkReservationStatus(req, res, next){
  
  if(res.locals.reservation.status === "seated") {
   next ({
      status: 400,
      message: `Reservation is already seated`,
    })
  }else{
    next()
  }
}
async function readTable(req, res) {
  const table = res.locals.table;
  res.json({ data: table });
}

async function readReservation(req, res) {
  const reservation = res.locals.reservation;
  res.json({ data: reservation });
}

async function tableHasCapacity(req, res, next) {
  const { capacity, people } = req.body.data;
  const { table_id } = req.params;
  const table = await service.readTable(table_id);
  const reservation = res.locals.reservation;

  
  if(table.capacity >= reservation.people) {
      return next();
  }
  next({
      status: 400,
      message: `Table capacity: ${table.capacity} is not sufficient to seat ${reservation.people} people`
  });
};

async function tableIsOccupied(req, res, next){
  const { table_id } = req.params;
  const table = await service.readTable(table_id);
  if(table.reservation_id) {
     next({
      status: 400,
      message: `Table is occupied`
    });
}

  next()
};

async function tableIsNotOccupied(req, res, next){
  const { table_id } = req.params;
  const table = await service.readTable(table_id);
  if(table.reservation_id === null) {
     next({
      status: 400,
      message: `Table is not occupied`
    });
}

  next()
};


async function create(req, res) {
  const newTable = {
    ...req.body.data,
    status: "free",
  };
  const result = await service.createTable(newTable);
  res.status(201).json({ data: result});
}


async function update(req, res) {
  const tableId = req.params.table_id;
  const reservationId = req.body.data.reservation_id;
  const responseData = await service.putSeatForTable(reservationId, tableId);
  res.status(200).json({ data: responseData});
}
 
async function finishTable(req, res){
  const { table_id } = req.params;
  const table = await service.readTable(table_id);
  const responseData = await service.finishTable(table.reservation_id, table_id);
  res.status(200).json({ data: responseData});
}


 module.exports = {
   listAllTables,
   read: [tableExists,
    readTable],
  create: [
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(hasValidFields),
    asyncErrorBoundary(validateTableName),
    asyncErrorBoundary(validateCapacity),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(hasRequiredDataProperties),
    asyncErrorBoundary(hasReservationIdfunction),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(checkReservationStatus),
    asyncErrorBoundary(tableHasCapacity),
    asyncErrorBoundary(tableIsOccupied),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(update),
  ],
  delete: [
    tableExists,
    tableIsNotOccupied,
    asyncErrorBoundary(finishTable),
    asyncErrorBoundary(listAllTables),
  ]
 };
 