import PropTypes from "prop-types";
import { useState } from "react";

function Card({ data, attributes, handleUpdate, handleDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  const handleEditClick = () => {
    setUpdatedData(data);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsLoading(true);
    // Simulate an asynchronous update process with a timeout
    setTimeout(() => {
      setIsLoading(false);
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000); // Reset updateSuccess after 3 seconds
    }, 2000); // Simulate a 2-second update process
    setIsEditing(false);
    handleUpdate(updatedData);
    console.log("updatedData on handleSaveClick",updatedData)
  };
  return (
    <div className={`card ${updateSuccess ? "border-success" : ""}`}>
      <div className="card-body">
        {attributes.map((attribute) => (
          <p key={attribute.key} className="card-text">
            <strong>{attribute.value}:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={updatedData[attribute.key] || ""}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    [attribute.key]: e.target.value,
                  })
                }
              />
            ) : (
              data[attribute.key]
            )}
          </p>
        ))}
        {isEditing ? (
          <button onClick={handleSaveClick} className="btn btn-primary">
            {isLoading ? "Saving..." : "Save"}
          </button>
        ) : (
          <>
            <button
              onClick={() => handleDelete(data)}
              className="btn btn-danger mr-2"
            >
              Delete
            </button>
            <button onClick={handleEditClick} className="btn btn-primary">
              Edit
            </button>
          </>
        )}
        {updateSuccess && (
          <span className="badge badge-success ml-2">Update Success</span>
        )}
      </div>
    </div>
  );
}
Card.propTypes = {
  data: PropTypes.object.isRequired,
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
};

export default Card;
