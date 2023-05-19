import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import ReservationsForm from "../reservations/ReservationsForm";
import TablesForm from "../tables/TablesForm";
import SearchReservation from "../reservations/SearchReservation";
import SeatTableForm from "../reservations/SeatTableForm";
import EditReservationsForm from "../reservations/EditReservationsForm";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date");
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <EditReservationsForm />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatTableForm />
      </Route>
      <Route exact={true} path="/reservations/new">
        <ReservationsForm />
      </Route>
      <Route exact={true} path="/tables/new">
        <TablesForm />
      </Route>
      <Route exact={true} path="/tables/:table_id/seat">
        <SeatTableForm />
      </Route>
      <Route exact={true} path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/search">
        <SearchReservation />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date || today()}  />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
