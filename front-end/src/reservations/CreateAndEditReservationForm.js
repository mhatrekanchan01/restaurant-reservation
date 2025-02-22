import React from "react";
import { useHistory,  } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
function CreateAndEditReservationForm({reservation, handleChange, handleSubmit, reservationError}){
    const history = useHistory();
    return(
        <>
        {reservationError.length ? <ErrorAlert error={reservationError}/> : null}
        <div className="container-fluid col-12 text-center p-3 mb-2 bg-light text-dark">
          <h1><p className="text-secondary">Reservation</p></h1>
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
                    value={`${reservation.first_name}`}
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
                    value={`${reservation.last_name}`}
                    placeholder="Last Name" 
                    />   
                
                    <br />
                    <div>
                <label><h4 className="card-title text-center">
                      <p className="text-secondary">Mobile Number</p>
                    </h4></label>
                    <input
                    id="mobile_number"
                    type="tel"
                    pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
                    name="mobile_number"
                    className="form-control"
                    onChange={handleChange}
                    value={`${reservation.mobile_number}`}
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
                    value={`${reservation.reservation_date}`}
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
                    value={`${reservation.reservation_time}`}
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
                <button type="submit" value="Submit" className="btn btn-primary btn-lg" >Submit</button>
                <button type="button" value="cancel" className="btn btn-warning btn-lg" onClick={() => history.push("/")} >cancel </button>
                
            </form>
        </>
    )
}

export default CreateAndEditReservationForm;