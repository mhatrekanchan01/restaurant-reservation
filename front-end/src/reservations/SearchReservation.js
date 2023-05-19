import React, { useState } from "react";
import { useHistory,  } from "react-router";
import {searchReservationByMobileNumber} from "../utils/api";
import ReservationsList from "../reservations/ReservationsList";

function SearchReservation(){
    const history = useHistory();
    const initialFormState = { 
        mobile_number: "",
      };
      const [formData, setformData] = useState({ ...initialFormState }); /* Set form state to blank object*/
      const handleChange = ({ target }) => {
        setformData({
           ...formData,
            [target.name]: target.value,
         });
        };

     const handleSubmit = async(event) => {
        const abortController = new AbortController();
            event.preventDefault();
            formData.mobile_number = Number(formData.mobile_number);
          try
          {const response = await searchReservationByMobileNumber(formData.mobile_number, abortController.signal);
                  setformData(response);
                  event.target.reset();}
                  catch(error){
                    return console.log("Something went wrong", error);
                  }
                  return () => abortController.abort();
         }
    
         let reservationList = [];
         if(formData.length > 0) {
             reservationList = formData.map((reservation) => {
                 return(
                     <div key={reservation.reservation_id}>
                     <ReservationsList reservation={reservation}/>
                 </div>
                 )
             })
         } 
         if(formData.length === 0){
            reservationList = <h3>**No reservations found**</h3>   
         }

         
    return(
        <>
        <div className="container-fluid col-12 text-center p-3 mb-2 bg-light text-dark">
              <h1><p className="text-secondary">Search For Reservation</p></h1>
            </div>
        <form onSubmit={handleSubmit}>
            <div>
        <label>
                        <h4 className="card-title text-center">
                          <p className="text-secondary">Mobile Number</p>
                        </h4>
                          
                      </label>
                <input
                id="mobile_number"
                type="text"
                name="mobile_number"
                className="form-control"
                onChange={handleChange}
                value={formData.value}
                placeholder="Enter a customer's phone number" 
                required
                />   
            </div>
            {reservationList}
        <br />
        <button type="submit" className="btn btn-info btn-lg">Find</button>
        <button className="btn btn-warning btn-lg" onClick={() => history.push("/")}>cancel</button>
        </form>
        </>
    )
}

export default SearchReservation;