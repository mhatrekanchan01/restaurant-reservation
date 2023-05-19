import React, { useEffect, useState } from "react";
import { useHistory, useParams} from "react-router"
import { listTables, seatReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatTableForm(){
    const history = useHistory();
    const { reservation_id } = useParams();
    const [tables, setTables] = useState([]);

  const [seatTableId, setSeatTableId ] = useState(null);
  const [reservationError, setReservationError] = useState([]);


    useEffect(() => {
        const abortController = new AbortController();
        async function loadTables() {
          try {
            const tableList = await listTables(abortController.signal);
            setTables(tableList);
          } catch (error) {
            console.log(error.message);
          }
        }
        loadTables();
       // return () => abortController.abort();
      }, []);
      
    const handleClick = ({target}) => {
      setSeatTableId(target.value);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const abortController = new AbortController();
      try {
        await seatReservations( reservation_id, seatTableId, abortController.signal);
        
        history.push("/dashboard");
      } catch (error) {
        setReservationError([ error.message, ...reservationError]);
      }
      
    };

return (
   <>
   <div className="col-sm">
                        <h3 className="card-title text-center">
                          <p className="text-secondary">Seating for Table</p>
                        </h3>
                      </div>
                      
   <form onSubmit={handleSubmit}>
   <label htmlFor="table_name">
   <h4 className="card-title text-center">
                          <p className="text-secondary">Table Name</p>
                        </h4>
  <select
             className="form-control"
             id="table_id"
             name="table_id"
             onChange={handleClick}
             
           >
             <option value="">-- Select a Table --</option>
             {tables.map((table) => (
               <option key={table.table_id} value={table.table_id}>
                 {table.table_name} - {table.capacity}
               </option>
             ))}
           </select>
</label>
<div>
<button type="submit" value="Submit" className="btn btn-primary btn-lg" >Submit</button>
<button type="button" value="cancel" className="btn btn-warning btn-lg" onClick={() => history.push("/")} >cancel</button>
</div>
{reservationError.length ? <ErrorAlert error={reservationError}/> : null}
   </form>
   

   </>
)
}

export default SeatTableForm;