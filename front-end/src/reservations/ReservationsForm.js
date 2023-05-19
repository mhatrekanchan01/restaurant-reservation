import React, { useState } from "react";
import { useHistory,  } from "react-router";
import {createReservation} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";



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
            <div className="container-fluid col-12 text-center p-3 mb-2 bg-light text-dark">
              <h1><p className="text-secondary">Create New Reservation</p></h1>
            </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <h4 className="card-title text-center">
                          <p className="text-secondary">First Name</p>
                        </h4>
                        </label>
                        <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.first_name}
                        placeholder="First Name" 
                        />
                    <br />
                    <label><h4 className="card-title text-center">
                          <p className="text-secondary">Last Name</p>
                        </h4></label>
                        <input
                        id="last_name"
                        type="text"
                        name="last_name"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.last_name}
                        placeholder="Last Name" 
                        />   
                    
                        <br />
                        <div>
                    <label><h4 className="card-title text-center">
                          <p className="text-secondary">Mobile Number</p>
                        </h4></label>
                        <input
                        id="mobile_number"
                        type="text"
                        name="mobile_number"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.mobile_number}
                        placeholder="000-000-0000" 
                        
                        />   
                    
                        </div>
                        <br />
                        <div>
                        <label><h4 className="card-title text-center">
                          <p className="text-secondary">Date Of Reservation</p>
                        </h4></label>
                        <input
                        id="reservation_date"
                        type="date"
                        name="reservation_date"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.reservation_date}
                        placeholder="YYYY-MM-DD" 
                        required
                        />   
                      <br />
                        <label><h4 className="card-title text-center">
                          <p className="text-secondary">Time Of Reservation</p>
                        </h4></label>
                        <input
                        id="reservation_time"
                        type="time"
                        name="reservation_time"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.reservation_time}
                        placeholder="HH:MM:SS" 
                        required
                        />   
                    
                        </div>
                        <br />
                        <div>
                        <label><h4 className="card-title text-center">
                          <p className="text-secondary">Size Of Party</p>
                        </h4></label>
                        <input
                        id="people"
                        type="number"
                        name="people"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.people}
                        placeholder="00"
                        required
                        />
                    </div> 
                    <br />
                    <button type="submit" value="Submit" className="btn btn-primary btn-lg" >Submit</button>
                    <button type="button" value="cancel" className="btn btn-warning btn-lg" onClick={() => history.push("/")} >cancel </button>
                    {reservationError.length ? <ErrorAlert error={reservationError}/> : null}
                </form>
            </>
        )
    

     

 
}

export default ReservationsForm;