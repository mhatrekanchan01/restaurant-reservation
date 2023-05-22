
import React, { useEffect, useState } from "react";
import { useHistory, useParams  } from "react-router";
import { readReservation, editReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import CreateAndEditReservationForm from "../reservations/CreateAndEditReservationForm";

function EditReservationsForm(){
    const {reservation_id} = useParams();
    const history = useHistory();
    let initialFormState = { 
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
      };

      const [reservation, setReservation] = useState(initialFormState);
      const [reservationError, setReservationError] = useState([]);
    


    useEffect(() => {
        const abortController = new AbortController();
        async function editReservationForm(){
          try{
            const fetch = await readReservation(reservation_id);
            setReservation(fetch);
          }catch(error){
            console.log("Sorry something went wrong", error);
          }

      };
      editReservationForm()
      }, [reservation_id])

      
      const handleChangeForEdit = ( e ) => {
        setReservation({
            ...reservation,
            [e.target.name]: e.target.value,
            
        });
    }  
      async function handleSubmitForEdit(event) {
        console.log("Submitting ...");
        const abortController = new AbortController();
        event.preventDefault();
        reservation.people = Number(reservation.people);
        try{
          const response = await editReservation({...reservation});
          setReservation({...response});
          console.log(response);
        }catch(error){
          return setReservationError([ error.message, ...reservationError]);
        }  
        history.push(`/dashboard?date=${reservation.reservation_date}`);
    }

    
    return(
        <>
            <CreateAndEditReservationForm reservation={reservation} handleChange={handleChangeForEdit} handleSubmit={handleSubmitForEdit} reservationError={reservationError}/>
            
        </>
    )
}

export default EditReservationsForm;