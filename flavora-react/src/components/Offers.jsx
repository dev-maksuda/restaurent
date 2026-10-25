/* ============================================================
   7. OFFERS — live countdown timer + three offer cards.
   The end time is saved in the browser so a refresh keeps it.
============================================================ */

import { useEffect, useState } from "react";

import Reveal from "./Reveal";

const OFFER_KEY = "flavoraOfferEnd";

// Where does the countdown end? 3 days and 8 hours from the first visit
function getOfferEnd() {
  const saved = Number(localStorage.getItem(OFFER_KEY));
  if (saved && saved > Date.now()) return saved;

  const end = Date.now() + 3 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000;
  localStorage.setItem(OFFER_KEY, String(end));
  return end;
}

// How much time is left, split into days / hours / minutes / seconds
function getTimeLeft(end) {
  const left = Math.max(0, end - Date.now());

  return {
    days: Math.floor(left / (1000 * 60 * 60 * 24)),
    hours: Math.floor((left / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((left / (1000 * 60)) % 60),
    seconds: Math.floor((left / 1000) % 60),
  };
}

// Always show two digits (for example 05)
const pad = (number) => String(number).padStart(2, "0");

const OFFER_CARDS = [
  {
    style: "offer-card--1",
    off: "-25%",
    title: "Lunch Deal",
    text: "Any lunch main course + soft drink",
    note: "Mon – Fri, 12 PM – 3 PM",
  },
  {
    style: "offer-card--2",
    off: "-40%",
    title: "Student Offer",
    text: "Show your ID card and save big",
    note: "Every day after 4 PM",
  },
  {
    style: "offer-card--3",
    off: "FREE",
    title: "Birthday Cake",
    text: "Book a party of 6+ and get a cake",
    note: "Reservation required",
  },
];

export default function Offers() {
  const [end] = useState(() => getOfferEnd());
  const [left, setLeft] = useState(() => getTimeLeft(end));

  // Tick every second
  useEffect(() => {
    const timer = setInterval(() => setLeft(getTimeLeft(end)), 1000);
    return () => clearInterval(timer);
  }, [end]);

  const timerBoxes = [
    { value: left.days, label: "Days" },
    { value: left.hours, label: "Hours" },
    { value: left.minutes, label: "Minutes" },
    { value: left.seconds, label: "Seconds" },
  ];

  return (
    <section className="section offers" id="offers">
      <div className="container offers__grid">

        <Reveal className="offers__body">
          <p className="section__tag">Limited Time Offer</p>
          <h2 className="section__title">Weekend Family Combo — <em>35% Off</em></h2>

          <p className="section__text">
            Get 2 main courses, 2 drinks and 1 dessert for the whole family.
            Offer is valid for dine-in only and ends soon!
          </p>

          {/* Countdown timer */}
          <div className="timer">
            {timerBoxes.map((box) => (
              <div className="timer__box" key={box.label}>
                <strong>{pad(box.value)}</strong>
                <span>{box.label}</span>
              </div>
            ))}
          </div>

          <a href="#reserve" className="btn btn--primary">Grab This Offer</a>
        </Reveal>

        <div className="offers__cards">
          {OFFER_CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              className={`offer-card ${card.style}`}
              delay={(i % 4) * 90}
            >
              <span className="offer-card__off">{card.off}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <small>{card.note}</small>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
