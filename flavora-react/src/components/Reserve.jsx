/* ============================================================
   11. RESERVATION — contact details on the left,
   the booking form (with validation) on the right
============================================================ */

import { useState } from "react";

import Reveal from "./Reveal";
import { useToast } from "./Toast";

const CONTACTS = [
  { icon: "📍", text: "24 Gulshan Avenue, Dhaka 1212" },
  { icon: "📞", text: "+880 1712-345678" },
  { icon: "✉️", text: "hello@flavora.com" },
  { icon: "⏰", text: "Open daily 10:00 AM – 11:30 PM" },
];

// The form starts with today's date and 7:30 PM
const today = new Date().toISOString().split("T")[0];
const EMPTY_FORM = { name: "", phone: "", date: today, time: "19:30", guests: "2", message: "" };

export default function Reserve() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const showToast = useToast();

  function updateField(field, value) {
    setForm({ ...form, [field]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (form.name.trim().length < 3) nextErrors.name = true;
    if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) nextErrors.phone = true; // Bangladeshi mobile
    if (!form.date) nextErrors.date = true;
    if (!form.time) nextErrors.time = true;

    setErrors(nextErrors);

    if (nextErrors.name) return showToast("Please write your full name (at least 3 letters).", true);
    if (nextErrors.phone) return showToast("Please give a valid phone number like 01712345678.", true);
    if (nextErrors.date) return showToast("Please choose a reservation date.", true);
    if (nextErrors.time) return showToast("Please choose a reservation time.", true);

    showToast(
      `Thank you ${form.name.trim()}! Table for ${form.guests} is booked on ${form.date} at ${form.time}.`
    );

    setForm(EMPTY_FORM);
  }

  return (
    <section className="section reserve" id="reserve">
      <div className="container reserve__grid">

        <Reveal className="reserve__info">
          <p className="section__tag">Reservation</p>
          <h2 className="section__title">Book Your Table <em>Today</em></h2>

          <p className="section__text">
            Planning a family dinner or a small celebration? Reserve your table
            in advance and we will keep it ready for you.
          </p>

          <ul className="info-list">
            {CONTACTS.map((item) => (
              <li key={item.text}>
                <span className="info-list__icon">{item.icon}</span> {item.text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="form" className="form" onSubmit={handleSubmit} noValidate>
          <h3 className="form__title">Reserve a Table</h3>

          <div className="form__row">
            <div className="form__group">
              <label htmlFor="rName">Full Name</label>
              <input
                id="rName"
                type="text"
                placeholder="Your name"
                className={errors.name ? "is-error" : ""}
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="rPhone">Phone Number</label>
              <input
                id="rPhone"
                type="tel"
                placeholder="01XXXXXXXXX"
                className={errors.phone ? "is-error" : ""}
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form__group">
              <label htmlFor="rDate">Date</label>
              <input
                id="rDate"
                type="date"
                min={today}
                className={errors.date ? "is-error" : ""}
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="rTime">Time</label>
              <input
                id="rTime"
                type="time"
                className={errors.time ? "is-error" : ""}
                value={form.time}
                onChange={(event) => updateField("time", event.target.value)}
              />
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="rGuest">Number of Guests</label>
            <select
              id="rGuest"
              value={form.guests}
              onChange={(event) => updateField("guests", event.target.value)}
            >
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="6">6+ People (Party)</option>
            </select>
          </div>

          <div className="form__group">
            <label htmlFor="rMsg">Special Request</label>
            <textarea
              id="rMsg"
              rows="3"
              placeholder="Any allergy or special note..."
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn--primary btn--block">Confirm Reservation</button>
          <p className="form__note">We will call you within 10 minutes to confirm.</p>
        </Reveal>

      </div>
    </section>
  );
}
