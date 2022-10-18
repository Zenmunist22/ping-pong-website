import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from "@mui/material";

export default function RecordList() {
 const [records, setRecords] = useState<any[]>([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id: any) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'knightsEmail', headerName: 'Knights Email', width: 300 },

    { 
      field: 'rating',
      headerName: 'Rating', 
      width: 130,
      renderCell: (params) => (
        params.formattedValue != null ? params.formattedValue : "N/A" 
      )
    },

    { field: 'ucfId', headerName: 'ucfId', width: 130 },

    { 
      field: '_id', 
      headerName: 'Delete', 
      renderCell: (params) => (
        <Button
          onClick={() => {
            deleteRecord(params.formattedValue);
          }}
        >
          Delete
        </Button>
      )
    }


  ];
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <div style={{ height: 400, width: '50%' }}>
      <DataGrid
        rows={records}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.ucfId}
      />
    </div>
   </div>
 );
}

/*
 const Record = (props: any) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.ucfId}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
 );
  
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
*/