import React, { useState } from 'react';
import firebase from '../firebase';

export default function Contact() {
  const [nimi, setNimi] = useState('');
  const [email, setEmail] = useState('');
  const [palaute, setPalaute] = useState('');
  const [sent, setSent] = useState(false);

  function sendContact(e) {
    e.preventDefault();
    let ref = firebase.database().ref('contact');
    const contactItem = {
      nimi: nimi,
      email: email,
      palaute: palaute
    };
    ref.push(contactItem);
    setNimi('');
    setEmail('');
    setPalaute('');
    setSent(true);
  }

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
      default:
        break;
    }
  }

  return (
    <div className="container">
      <h4 className="my-3">Ota yhteyttä</h4>
      {sent ? (
        <div className="alert alert-success" role="alert">
          Palaute lähetetty!
        </div>
      ) : null}

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
          onClick={sendContact}
        />
      </form>
    </div>
  );
}
