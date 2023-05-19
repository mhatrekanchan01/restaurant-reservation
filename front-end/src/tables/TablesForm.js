import React, { useState } from "react";
import { useHistory } from "react-router";
import {createTable} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function TablesForm(){
    
    const history = useHistory();
    const initialFormState = { 
        table_name: "",
        capacity: "",
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
    
   //   

    async function handleSubmit(event){
        event.preventDefault();  /* prevents page refresh */
        formData.capacity = Number(formData.capacity);
        try{
            const response = await createTable({...formData});
            setformData(response);
            setformData({...initialFormState});
        }catch(error){
           return setReservationError([...reservationError, error.message]);
        }
        history.push("/dashboard/");    
     }
 
return (
    <>
    <div className="container-fluid col-12 text-center p-3 mb-2 bg-light text-dark">
              <h1><p className="text-secondary">Create New Table</p></h1>
            </div>
        <form onSubmit={handleSubmit}>
        <div>
                <label><h4 className="card-title text-center">
                          <p className="text-secondary">Table Name</p>
                        </h4></label>
                <input
                id="table_name"
                type="text"
                name="table_name"
                className="form-control"
                onChange={handleChange}
                value={formData.table_name}
                placeholder="Table Name" 
                required
                />   
            
            </div>
            <br />
            <div>
                <label><h4 className="card-title text-center">
                          <p className="text-secondary">Capacity</p>
                        </h4></label>
                <input
                id="capacity"
                type="number"
                name="capacity"
                className="form-control"
                onChange={handleChange}
                value={formData.capacity}
                placeholder="00" 
                required
                />
            </div>
            <br />
            <button type="submit" value="Submit" className="btn btn-primary btn-lg">Submit</button>
            <button type="button" value="Cancel" className="btn btn-warning btn-lg" onClick={() => history.goBack()}>cancel</button>
        </form>
        {reservationError.length ? <ErrorAlert error={reservationError}/> : null}
    </>
)
}

export default TablesForm;