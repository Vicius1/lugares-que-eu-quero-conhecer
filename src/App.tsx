import React, { useState } from "react";
import Form from "./components/Form";
import PlaceCard from "./components/PlaceCard";
import logo from "./assets/logo.png";
import "./App.css";

interface Place {
  country: string;
  location: string;
  date: string;
  flag: string;
}

const App: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  const addPlace = (newPlace: Place) => {
    setPlaces([...places, newPlace]);
    console.log("Novo lugar adicionado:", newPlace);
  };

  const deletePlace = (index: number) => {
    const updatedPlaces = places.filter((_, i) => i !== index);
    setPlaces(updatedPlaces);
  };

  const editPlace = (index: number, updatedPlace: { location: string; date: string }) => {
    const updatedPlaces = places.map((place, i) =>
      i === index ? { ...place, ...updatedPlace } : place
    );
    setPlaces(updatedPlaces);
  };

  return (
    <div className="App">
      {/* Barra preta */}
      <div className="header">
        <img src={logo} alt="Lugares que quero conhecer" className="logo" />
      </div>

      {/* Área verde com o formulário */}
      <div className="form-container">
        <Form addPlace={addPlace} />
      </div>

      {/* Lista de Lugares */}
      <div className="places-container">
        {places.map((place, index) => (
          <PlaceCard
            key={index}
            country={place.country}
            location={place.location}
            date={place.date}
            flag={place.flag}
            onEdit={(updatedPlace) => editPlace(index, updatedPlace)}
            onDelete={() => deletePlace(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
