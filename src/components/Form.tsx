import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

interface Country {
  name: string;
  flags: { png: string };
}

interface FormProps {
  addPlace: (place: { country: string; location: string; date: string, flag: string }) => void;
}

const Form: React.FC<FormProps> = ({ addPlace }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [flag, setFlag] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all?fields=name,flags")
      .then((response) => {
        setCountries(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Erro ao buscar países:", error));
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = countries.find((c) => c.name === e.target.value);
    setSelectedCountry(selectedCountry?.name || "");
    setFlag(selectedCountry?.flags?.png || "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry || !location || !date) return;

    addPlace({ country: selectedCountry, location, date, flag });

    setSelectedCountry("");
    setLocation("");
    setDate("");
    setFlag("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="input-group">
        <label>País</label>
        <select value={selectedCountry} onChange={handleCountryChange} required>
          <option value="">Selecione...</option>
          {countries.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group ">
        <label>Local</label>
        <input
          type="text"
          placeholder="Digite o local que deseja conhecer"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Meta</label>
        <InputMask
          mask="99/9999"
          placeholder="mês/ano"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

        <button type="submit">Adicionar</button>
    </form>
  );
};

export default Form;
