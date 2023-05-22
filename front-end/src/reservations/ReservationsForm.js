import React, { useState } from "react";
import { useHistory,  } from "react-router";
import {createReservation} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import CreateAndEditReservationForm from "./CreateAndEditReservationForm";


function ReservationsForm(){
  const history = useHistory();
    /* set initial form properties to blank value */
    const initialFormState = { 
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
      };
    const [formData, setformData] = useState({ ...initialFormState }); /* Set form state to blank object*/
    const [reservationError, setReservationError] = useState([]);


    /* add new formdata to existing data */
    const handleChange = ({ target }) => {
     setformData({
        ...formData,
         [target.name]: target.value,
      });
     };
    

    async function handleSubmit(event){
        const abortController = new AbortController();
        event.preventDefault();  /* prevents page refresh */
        formData.people = Number(formData.people);
        try{
            const response = await createReservation({...formData}, abortController.signal);
              setformData(response);
              setformData({...initialFormState});
              event.target.reset();
        }catch(error){
            setReservationError([ error.message, ...reservationError]);
            return;
          } 

        history.push(`/dashboard?date=${formData.reservation_date}`);
        //return () => abortController.abort();
     }
        return(
            <>
            <CreateAndEditReservationForm reservation={formData} handleChange={handleChange} handleSubmit={handleSubmit} reservationError={reservationError} /> 
            </>
        )
    

     

 
}

export default ReservationsForm;