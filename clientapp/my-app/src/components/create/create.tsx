import React, { useState } from "react";
import { useNavigate } from "react-router";
import '../create/create.css'

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    ucfId: "",

  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value: { name?: string; ucfId?: string; }) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({ name: "", ucfId: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div className="create_container">
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            required
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">UCF ID</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.ucfId}
            required
            onChange={(e) => updateForm({ ucfId: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}