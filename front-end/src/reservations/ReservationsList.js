import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cancelReservation } from "../utils/api";
import { useHistory} from "react-router";
import ErrorAlert from "../layout/ErrorAlert";


function ReservationsList({ reservation }) {
  const history = useHistory();
  const [reservationError, setReservationError] = useState([]);

  const handleCancelClick = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    //Prompt to confirm before changing current reservation status
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone.\nEither OK or Cancel."
      )
    ) {
      try {
        await cancelReservation(reservation.reservation_id, abortController.signal);
        
      } catch (error) {
        //catch any errors and set the errors to be displayed on ErrorAlert component
        return setReservationError([error.message, ...reservationError]);
      }
    }
    history.goBack();
    /*window.location.reload();*/

  };

  return (
    <div key={reservation.reservation_id}>
      <div className="card-header bg-light text-black" key={reservation.reservation_id}>
        <h4 className="list-group-item">
          {reservation.first_name} {reservation.last_name}
        </h4>
        <li className="list-group-item">Date: {reservation.reservation_date}</li>
        <li className="list-group-item">Time: {reservation.reservation_time}</li>
        <li className="list-group-item">Mobile Number: {reservation.mobile_number}</li>
        <li className="list-group-item">People: {reservation.people}</li>
        <li data-reservation-id-status={reservation.reservation_id} className="list-group-item">
          <button className="btn btn-primary position-relative btn-lg">
            Status
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              <span className="visually-hidden">{reservation.status}</span>
            </span>
          </button>
        </li>
        <div className="btn-toolbar" role="toolbar" aria-label="Basic example">
          <div>
            {(reservation.status === "booked") && (<Link
              to={`/reservations/${reservation.reservation_id}/seat`}
            >
              <button className="btn btn-success btn-lg" type="button">Seat</button>
            </Link>)
            }
          </div>
          <div>
            <Link 
                    to={`/reservations/${reservation.reservation_id}/edit`}
                    >
                        <button className="btn btn-info btn-lg">Edit</button>
                        </Link>
          </div>
          <div>
            <button type="cancel" className="btn btn-warning btn-lg" onClick={handleCancelClick} data-reservation-id-cancel={`${reservation.reservation_id}`} >Cancel</button>
          </div>
        </div>
      </div>
      {reservationError.length ? <ErrorAlert error={reservationError} /> : null}
    </div>
  )

}

export default ReservationsList;