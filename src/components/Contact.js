import React, { useState } from 'react';
import firebase from '../firebase';

export default function Contact() {
  const [nimi, setNimi] = useState('');
  const [email, setEmail] = useState('');
  const [palaute, setPalaute] = useState('');

  function handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    switch (name) {
      case 'nimi':
        setNimi(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'palaute':
        setPalaute(value);
        break;
    }
  }

  return (
    <div className="container d-flex flex-column">
      <h4 className="my-3">Ota yhteyttä</h4>
      <form>
        <div className="form-group">
          <label>Nimi</label>
          <input
            name="nimi"
            className="form-control"
            type="text"
            placeholder="Nimesi"
            value={nimi}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="sinun@email.fi"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Palaute</label>
          <textarea
            name="palaute"
            value={palaute}
            className="form-control"
            onChange={handleChange}
          />
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
