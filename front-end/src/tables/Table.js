import React from "react";
import TablesList from "../tables/TablesList";

export default function Tables({ tables }) {

    const list = tables.map(table => {
        return <TablesList 
            key={table.table_id}
            table={table}
        />
    });

    return(
        <div>
            {list}
        </div>
    );

}