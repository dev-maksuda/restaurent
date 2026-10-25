/* ============================================================
   14. NEWSLETTER — email box that gives 10% off the first order
============================================================ */

import { useState } from "react";

import Reveal from "./Reveal";
import { useToast } from "./Toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const showToast = useToast();

  function handleSubmit(event) {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email.trim())) {
      return showToast("Please enter a correct email address.", true);
    }

    showToast("Subscribed! Your 10% discount code is on the way 🎉");
    setEmail("");
  }

  return (
    <section className="section newsletter" id="newsletter">
      <Reveal className="container newsletter__inner">
        <div className="newsletter__body">
          <h2>Get 10% Off Your First Order</h2>
          <p>Join our newsletter for new dishes, seasonal offers and event invitations.</p>
        </div>

        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" className="btn btn--primary">Subscribe</button>
        </form>
      </Reveal>
    </section>
  );
}
