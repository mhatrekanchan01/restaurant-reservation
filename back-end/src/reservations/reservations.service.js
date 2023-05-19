const knex = require("../db/connection");

function listAllReservations(){
    return knex("reservations")
    .select("*")
}

function listReservationsForDate(date){
    return knex("reservations as r")
    .select("*")
    .where({'reservation_date': date})
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .orderBy('reservation_time','asc')
}

function listReservationsForMobileNumber(mobile_number){
    return knex("reservations")
    .whereRaw("translate(mobile_number, '() -', '') like ?",`%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function createReservation(reservation) {
    return knex("reservations")
      .insert(reservation)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
  }

const read = async(reservation_id) => {
    return knex("reservations")
    .select("*")
    .where({reservation_id: reservation_id})
    .first(); 
}

function update(updatedReservation){
    return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id})
    .update(updatedReservation, "*")
    .then((createdRecords) => createdRecords[0]);
}

function cancelReservation(reservationId, status) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id: reservationId })
      .update({ status: status }, "*")
      .then((data) => data[0]);
  }


module.exports = {
    listAllReservations,
    listReservationsForDate,
    listReservationsForMobileNumber,
    createReservation,
    read,
    update,
    cancelReservation,
  };
  