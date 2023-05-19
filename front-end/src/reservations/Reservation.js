import React from "react";
import ReservationsList from "../reservations/ReservationsList";

export default function Reservations({ reservations }) {

    const list = reservations.map(reservation => {

        return <ReservationsList 
            key={reservation.reservation_id}
            reservation={reservation}
        />
    });

    return(
        <div>
            {list}
        </div>
    );

}