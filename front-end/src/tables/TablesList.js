import React, { useState } from "react";
import { finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TablesList({table, reservation}){



const [reservationError, setReservationError] = useState([]);




const handleFinishButton = async (event) => {

    const abortController = new AbortController();
    event.preventDefault();
    if (
        window.confirm(
          "Is this table ready to seat new guests? This cannot be undone.\nEither OK or Cancel."
        )
      ) {
        try {       
          await finishTable(table.table_id, abortController.signal); 
        } catch (error) {
          //catch any errors and set the errors to be displayed on ErrorAlert component
          return setReservationError([error.message, ...reservationError]);
        }
        window.location.reload();
      }
}
const hide = table.reservation_id  ?{}:{
  display: 'none'
};

return(
    <>
        <div className="card-header bg-light text-black" key={table.table_id}>
        <h4 className="list-group-item">
         Table Name: {table.table_name} 
         </h4>
         <div>
            <li className="list-group-item"><button className="btn btn-primary position-relative btn-lg">
            Status
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              <span className="visually-hidden"><p  data-table-id-status={`${table.table_id}`}>{table.reservation_id ? "occupied" : "free"}</p></span>
            </span>
          </button>
          </li>
         </div>
         <li className="list-group-item">Capacity: {table.capacity}</li>
         <div>
         <button style={hide} data-table-id-finish={table.table_id} className="btn btn-primary mx-1 btn-lg" onClick={handleFinishButton}>Finish</button>
         </div>
        </div>
        {reservationError.length ? <ErrorAlert error={reservationError}/> : null}
    </>
)

}

export default TablesList;