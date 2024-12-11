import React from "react";

const ChangeHouse = ({ casa, handleChangeHouse, handleSaveHouse, errors }) => {
  return(
    <div className="container">
      <h2 className="text-golden text-center">Cambiar casa ($150)</h2>
      <div className="m-3 row b-container shadow">
        <div className="card col-12 col-md-6 mb-3 p-3 b-container text-white border-0">
          <div className="text-start mt-1">
            <label htmlFor="house" className="form-label fw-bold text-white">Casa</label>
            <select
              className="form-select text-white b-select border-0 p-2"
              id="casa"
              value={casa}
              onChange={handleChangeHouse}
              required
            >
              <option value="" disabled>Seleccione una nueva casa</option>
              <option value="Gryffindor">Gryffindor</option>
              <option value="Ravenclaw">Ravenclaw</option>
              <option value="Hufflepuff">Hufflepuff</option>
              <option value="Slytherin">Slytherin</option>
            </select>
            {errors.casa && <p className="text-danger">{errors.casa}</p>}
          </div>
        </div>
        <div className="col-12 col-md-6 mb-3 b-container text-center border-0">
          <img
            src="https://picsum.photos/250/250"
            alt="Avatar"
            className="img-fluid avatar-circle mt-3"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-lilac text-white shadow border-1"
          onClick={handleSaveHouse}
          disabled={Object.keys(errors).length > 0}
        >
          Guardar cambio
        </button>
      </div>
    </div>
  );
};

export default ChangeHouse;