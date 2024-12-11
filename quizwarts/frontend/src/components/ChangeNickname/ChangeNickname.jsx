import React from "react";

const ChangeNickname = ({ apodo, handleChangeNickname, handleSaveNickname, errors }) => {
  return(
    <div className="container">
      <h2 className="text-golden text-center">Cambiar apodo ($100)</h2>
      <div className="m-3 row b-container shadow">
        <div className="card col-12 col-md-6 mb-3 p-3 b-container text-white border-0">
          <div className="text-start mt-1">
            <label className="fw-bold">Apodo</label>
            <input
              type="text"
              className="form-control b-input text-white border-0 p-2"
              value={apodo}
              onChange={handleChangeNickname}
              required
            />
            {errors.apodo && <p className="text-danger">{errors.apodo}</p>}
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
          onClick={handleSaveNickname}
          disabled={Object.keys(errors).length > 0}
        >
          Guardar cambio
        </button>
      </div>
    </div>
  );
};

export default ChangeNickname;