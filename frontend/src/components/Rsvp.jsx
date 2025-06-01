import React, { useState } from "react";
import "./Rsvp.css";
import { useAuth } from "../context/AuthProvider";

const Rsvp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState("yes");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); 
  const {BASE_URL} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      attending: attending === "yes",
      guests: Number(guests),
      message: message.trim(),
    };

    try {
      const res = await fetch(`${BASE_URL}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setAttending("yes");
      setGuests(1);
      setMessage("");
    } catch (err) {
      console.error("RSVP submission failed:", err);
      setStatus("error");
    }
  };

  return (
    <div className="rsvp-container">
      <div className="rsvp-card">
        <h2 className="rsvp-heading">Kindly Respond</h2>
        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="rsvp-row">
            <div className="rsvp-field">
              <label htmlFor="firstName" className="rsvp-label">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="rsvp-input"
              />
            </div>
            <div className="rsvp-field">
              <label htmlFor="lastName" className="rsvp-label">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="rsvp-input"
              />
            </div>
          </div>

          <div className="rsvp-field">
            <label htmlFor="email" className="rsvp-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rsvp-input"
            />
          </div>

          <div className="rsvp-field">
            <span className="rsvp-label">Will you attend?</span>
            <div className="rsvp-radio-group">
              <label>
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={(e) => setAttending(e.target.value)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={(e) => setAttending(e.target.value)}
                />
                No
              </label>
            </div>
          </div>

          {attending === "yes" && (
            <>
              <div className="rsvp-field">
                <label htmlFor="guests" className="rsvp-label">
                  Number of Guests
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="rsvp-select"
                >
                  {[...Array(4)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rsvp-field">
                <label htmlFor="message" className="rsvp-label">
                  Leave us a message!
                </label>
                <textarea
                  id="message"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any message you would like to let us know / request / show us your excitement?"
                  className="rsvp-textarea"
                />
              </div>
            </>
          )}

          {attending === "no" && (
            <div className="rsvp-field">
              <label htmlFor="regret" className="rsvp-label">
                Leave us a note
              </label>
              <textarea
                id="regret"
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="We're sorry you can't make it—any message is welcome."
                className="rsvp-textarea"
              />
            </div>
          )}

          <button
            type="submit"
            className="rsvp-button"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Submit RSVP"}
          </button>

          {status === "success" && (
            <p className="rsvp-success">Thank you for your response!</p>
          )}
          {status === "error" && (
            <p className="rsvp-error">
              Oops. Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Rsvp;