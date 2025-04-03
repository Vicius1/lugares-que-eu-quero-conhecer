import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import EditModal from "../EditModal/EditModal";
import "./PlaceCard.css";

interface Place {
  country: string;
  location: string;
  date: string;
  flag: string;
  onEdit: (updatedPlace: { location: string; date: string }) => void;
  onDelete: () => void;
}

const PlaceCard: React.FC<Place> = ({ country, location, date, flag, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="place-card">
      <div className="card-header">
        <img src={flag} alt={`Bandeira de ${country}`} className="flag" />
        <div className="card-actions">
          <EditIcon className="icon" data-testid="EditIcon" onClick={() => setIsEditing(true)} />
          <CloseIcon className="icon" data-testid="CloseIcon" onClick={onDelete} />
        </div>
      </div>
      <h3 className="country-name">{country.toUpperCase()}</h3>
      <hr className="divider" />
      <p title={location}>Local: {location?.length > 23 ? location.slice(0, 23) + "..." : location || "Desconhecido"}</p>
      <p>Meta: {date}</p>

      <EditModal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        place={{ location, date }}
        onSave={onEdit}
      />
    </div>
  );
};

export default PlaceCard;
