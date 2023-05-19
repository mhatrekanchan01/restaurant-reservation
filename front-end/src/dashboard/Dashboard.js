import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { next, today, previous } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory,  } from "react-router";
import Reservation from "../reservations/Reservation";
import Table from "../tables/Table";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  
  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      try {
        const tableList = await listTables(abortController.signal);
        setTables(tableList);
      }catch (error) {
        console.log(error.message);
      }
    }
    loadTables();
    return () => abortController.abort();
  }, []);


          
  return (
          <main>
            <div className="container-fluid col-12 text-center p-3 mb-2 bg-light text-dark">
              <h1><p className="text-secondary">Dashboard</p></h1>
            </div>
            <br />
            <div className="d-md-flex mb-3">
                <div className="container-fluid">
                
                    <div className="text-center">
                    <span>
                      <h2><p className="text-primary">Reservations for {date}</p></h2>
                      </span>
                    </div>
                    
                    <br />
                  <section>
                    <div className="btn-group container-fluid d-grid gap-2 md-auto">
                      <button className="btn btn-outline-info"  onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>
                        Previous Day
                      </button>
                      <button className="btn btn-outline-info mx-2" onClick={() => history.push(`/dashboard/?date=${today()}`)}>
                        Today
                      </button>
                      <button className="btn btn-outline-info" onClick={() => history.push(`/dashboard/?date=${next(date)}`)}>
                        Next Day
                      </button>
                    </div>
                    </section>
                  <br />
                  <section>
                    <div className="row">
                      <div className="col-sm">
                        <h3 className="card-title text-center">
                          <p className="text-secondary">Reservations</p>
                        </h3>
                        <Reservation reservations={reservations}/>
                      </div>
                      <div className="col-sm">
                        <h3 className="card-title text-center">
                        <p className="text-secondary">Table</p>
                        </h3>
                        <Table tables={tables}/> 
                      </div>
                    </div>
                  </section>
                </div>
            </div>
                  <ErrorAlert error={reservationsError} />
          </main>
  );
  
}

export default Dashboard;
