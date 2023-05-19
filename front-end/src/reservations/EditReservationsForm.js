
import React, { useEffect, useState } from "react";
import { useHistory, useParams  } from "react-router";
import { readReservation, editReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservationsForm(){
    const {reservation_id} = useParams();
    const history = useHistory();
    const initialFormState = { 
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

      
      const handleChange = ( e ) => {
        setReservation({
            ...reservation,
            [e.target.name]: e.target.value,
            
        });
    }  
      async function handleSubmit(event) {
        const abortController = new AbortController();
        event.preventDefault();
        reservation.people = Number(reservation.people);
        try{
          const response = await editReservation({...reservation});
          setReservation({...response});
          
        }catch(error){
          return setReservationError([ error.message, ...reservationError]);
        }  
        history.push(`/dashboard?date=${reservation.reservation_date}`);
    }


    return(
        <>
        <div className="container-fluid col-12 text-center p-3 mb-2 bg-light text-dark">
              <h1><p className="text-secondary">Edit Reservation</p></h1>
            </div>
            <form onSubmit={handleSubmit}>
            
                <label><h4 className="card-title text-center">
                          <p className="text-secondary">First Name</p>
                        </h4></label>
                    <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    className="form-control"
                    onChange={handleChange}
                    value={reservation.first_name}
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
                    value={reservation.last_name}
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
                    value={reservation.mobile_number}
                    placeholder="000-000-0000" 
                    required
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
                    value={reservation.reservation_date}
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
                    value={reservation.reservation_time}
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
                    value={reservation.people}
                    placeholder="00" 
                    required
                    
                    />   
                
                </div>
                <br />
                <div>
                  <button type="submit" value="Submit" className="btn btn-primary btn-lg">Submit</button>
                  <button type="cancel" className="btn btn-warning btn-lg" onClick={() => history.goBack()} >cancel</button>
                </div>
            </form>
            {reservationError.length ? <ErrorAlert error={reservationError}/> : null}
        </>
    )
}

export default EditReservationsForm;