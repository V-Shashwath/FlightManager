
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const FlightTable = () => {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({
    id: null,
    airline: '',
    source: '',
    destination: '',
    fare: null,
    duration: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch flights data from API on component mount
  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:8001/getAllFlights');
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleEdit = (flight) => {
    setForm(flight);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/deleteFlight/${id}`);
      fetchFlights();
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8001/updateFlight/${form.id}`, form);
      } else {
        await axios.post('http://localhost:8001/insertFlight', form);
      }
      setForm({ id: null, airline: '', source: '', destination: '', fare: null, duration: '' });
      setIsEditing(false);
      fetchFlights();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>Flights List</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Airline</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Fare</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.airline}</td>
              <td>{flight.source}</td>
              <td>{flight.destination}</td>
              <td>{flight.fare}</td>
              <td>{flight.duration}</td>
              <td>
                <button onClick={() => handleEdit(flight)}>Edit</button>
                <button onClick={() => handleDelete(flight.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="first">
        <h2> Add / Edit Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Id:</label>
            <input name="id" value={form.id} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Airline:</label>
            <input name="airline" value={form.airline} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Source:</label>
            <input name="source" value={form.source} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Destination:</label>
            <input name="destination" value={form.destination} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Fare:</label>
            <input name="fare" value={form.fare} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Duration:</label>
            <input name="duration" value={form.duration} onChange={handleChange} />
          </div>
          <button id="formButton" type="submit">
            {isEditing ? 'Update Record' : 'Add Record'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightTable;
