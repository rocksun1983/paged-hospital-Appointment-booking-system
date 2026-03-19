import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/doctors";

export default function DoctorManager() {

  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: ""
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {

    try {

      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setDoctors(res.data);

    } catch (err) {

      console.log("Failed to load doctors", err);

    }

  }

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(
          `${API}/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setEditingId(null);

      } else {

        await axios.post(
          API,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );

      }

      setForm({
        name: "",
        specialization: "",
        email: "",
        phone: ""
      });

      loadDoctors();

    } catch (err) {

      console.log("Doctor save error", err);

    }

  }

  function editDoctor(doctor) {

    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      email: doctor.email,
      phone: doctor.phone
    });

    setEditingId(doctor._id);

  }

  return (

    <div className="doctor-manager">

      <h2>Doctor Manager</h2>

      

      <form onSubmit={handleSubmit} className="doctor-form">

        <input
          name="name"
          placeholder="Doctor Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <button type="submit" className="add-btn">

          {editingId ? "Update Doctor" : "Add Doctor"}

        </button>

      </form>


     

      <table className="doctor-table">

        <thead>

          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {doctors.map((doctor) => (

            <tr key={doctor._id}>

              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => editDoctor(doctor)}
                >
                  Edit
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}