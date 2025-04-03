import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form/Form";
import PlaceCard from "./components/PlaceCard/PlaceCard";
import logo from "./assets/logo.png";
import "./App.css";

interface Place {
  id?: number;
  country: string;
  location: string;
  date: string;
  flag: string;
}

const App: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  // Buscar os lugares do servidor ao iniciar
  useEffect(() => {
    axios.get("http://localhost:5000/places")
      .then((response) => setPlaces(response.data))
      .catch((error) => console.error("Erro ao buscar lugares:", error));
  }, []);

  // Adicionar um lugar no servidor
  const addPlace = (newPlace: Place) => {
    axios.post("http://localhost:5000/places", newPlace)
      .then((response) => setPlaces([...places, response.data]))
      .catch((error) => console.error("Erro ao adicionar lugar:", error));
  };

  // Deletar um lugar no servidor
  const deletePlace = (id?: number) => {
    if (!id) return;
    axios.delete(`http://localhost:5000/places/${id}`)
      .then(() => setPlaces(places.filter(place => place.id !== id)))
      .catch((error) => console.error("Erro ao deletar lugar:", error));
  };

  // Editar um lugar no servidor
  const editPlace = (id: number, updatedPlace: { location: string; date: string }) => {

    if (!id) return;
    axios.patch(`http://localhost:5000/places/${id}`, updatedPlace)
      .then((response) => {
        setPlaces(places.map(place => (place.id === id ? response.data : place)));
      })
      .catch((error) => console.error("Erro ao editar lugar:", error));
  };

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Lugares que quero conhecer" className="logo" />
      </div>

      <div className="form-container">
        <Form addPlace={addPlace} />
      </div>

      <div className="places-container">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            country={place.country}
            location={place.location}
            date={place.date}
            flag={place.flag}
            onEdit={(updatedPlace) => place.id !== undefined && editPlace(place.id, updatedPlace)}
            onDelete={() => deletePlace(place.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
