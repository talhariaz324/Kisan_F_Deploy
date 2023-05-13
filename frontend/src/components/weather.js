import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';

const WeatherForecast = () => {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [forecast, setForecast] = useState([]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8cef8d23c55ce3c2676a16e65ad06920`;
    const geocodeRes = await fetch(geocodeUrl);
    const geocodeData = await geocodeRes.json();
    setLat(geocodeData[0].lat);
    setLon(geocodeData[0].lon);

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=8cef8d23c55ce3c2676a16e65ad06920`;
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();
    setForecast(forecastData.list.filter((item, index) => index % 8 === 0)); // get forecast for every 24 hours (5 days)
  };

  return (
    <div>
      <Form className='p-5' onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="city">City</Label>
          <Input type="text" name="city" id="city" placeholder="Enter city name" value={city} onChange={handleCityChange} />
        </FormGroup>
        <Button type="submit" color="success">Get Forecast</Button>
      </Form>

      {forecast.length > 0 && (
        <Table >
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature (°C)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((item) => (
              <tr key={item.dt}>
                <td>{new Date(item.dt * 1000).toLocaleDateString()}</td>
                <td>{Math.round(item.main.temp)}</td>
                <td>{item.weather[0].description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default WeatherForecast;
