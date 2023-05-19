const knex = require("../db/connection");

function listAllTables(){
    return knex("tables")
    .select("*")
    .orderBy("table_name", "asc")
}
function createTable(table){
    return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function readReservation(reservation_id){
    return knex("reservations")
    .select("*")
    .where({reservation_id}, req.param.KEY || 0)
    .first(); 
}

function readTable(table_id){
    return knex("tables")
    .select("*")
    .where({table_id: table_id})
    .first(); 
}

const putSeatForTable = async(reservationId, tableId) => {
    const trx = await knex.transaction();
    return trx("tables")
    .select("*")
    .where({ table_id: tableId})
    .update({reservation_id : reservationId, status : "occupied"})
    .then(() => {
        return trx("reservations")
    .select("*")
    .where({ reservation_id: reservationId})
    .update({status: "seated"})
    .then((createdRecords) => createdRecords[0])
    .then(trx.commit)
    .catch(trx.rollback);
    });
}

const finishTable = async(reservationId, tableId) => {
    const trx = await knex.transaction();
    return trx("tables")
    .select("*")
    .where({ table_id: tableId})
    .update({reservation_id : null, status : "free"})
    .then(() => {
        return trx("reservations")
    .select("*")
    .where({ reservation_id: reservationId})
    .update({status: "finished"})
    .then((createdRecords) => createdRecords[0])
    .then(trx.commit)
    .catch(trx.rollback);
    });
}

module.exports = {

    listAllTables,
    createTable,
    readReservation,
    readTable,
    putSeatForTable,
    finishTable,
  };
  