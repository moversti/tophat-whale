import React from 'react';

export default function Contact() {
  return (
    <div className="container d-flex flex-column">
      <h4 className="my-3">Ota yhteyttä</h4>
      <form>
        <div className="form-group">
          <label>Nimi</label>
          <input className="form-control" type="text" placeholder="Nimesi" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            placeholder="sinun@email.fi"
          />
        </div>
        <div className="form-group">
          <label>Palaute</label>
          <textarea className="form-control" />
        </div>
        <input
          type="submit"
          value="Lähetä"
          className="btn btn-primary"
          placeholder="Mitä asiaa?"
        />
      </form>
    </div>
  );
}
