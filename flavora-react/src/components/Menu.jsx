/* ============================================================
   6. FULL MENU — text based price list with filter tabs
   (All / Starters / Main Course / Desserts)
============================================================ */

import { useState } from "react";

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const TABS = [
  { key: "all", label: "All" },
  { key: "starter", label: "Starters" },
  { key: "main", label: "Main Course" },
  { key: "dessert", label: "Desserts" },
];

// Two columns of menu items, exactly like a printed menu card
const COLUMNS = [
  [
    {
      cat: "main",
      name: "Beef Tenderloin",
      price: "৳980",
      text: "Pan-seared tenderloin, red wine sauce, mashed potato.",
    },
    {
      cat: "starter",
      name: "Garlic Prawn Skewer",
      price: "৳520",
      text: "Butter garlic prawns grilled with lemon and chili flakes.",
    },
    {
      cat: "starter",
      name: "Crispy Chicken Wings",
      price: "৳360",
      text: "Six pieces tossed in our signature smoky BBQ glaze.",
    },
    {
      cat: "main",
      name: "Grilled Salmon Fillet",
      price: "৳1150",
      text: "Norwegian salmon, asparagus and creamy dill sauce.",
    },
  ],
  [
    {
      cat: "main",
      name: "Beef Cheese Burger",
      price: "৳450",
      text: "Double patty, cheddar, pickles and crispy fries.",
    },
    {
      cat: "dessert",
      name: "Chocolate Lava Cake",
      price: "৳290",
      text: "Warm molten cake with vanilla ice cream on the side.",
    },
    {
      cat: "dessert",
      name: "Classic Cheesecake",
      price: "৳270",
      text: "Baked New York style cheesecake with berry compote.",
    },
    {
      cat: "dessert",
      name: "Seasonal Fruit Bowl",
      price: "৳210",
      text: "Fresh cut fruits with honey, lime and mint leaves.",
    },
  ],
];

export default function Menu() {
  const [filter, setFilter] = useState("all");

  return (
    <section className="section section--dark menu" id="menu">
      <div className="container">

        <SectionHead tag="Food Menu" title={<>Today's <em>Full Menu</em></>} />

        {/* Filter tabs */}
        <Reveal className="tabs tabs--dark">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab ${filter === tab.key ? "is-active" : ""}`}
              onClick={() => setFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </Reveal>

        <div className="menu__grid">
          {COLUMNS.map((column, columnIndex) => (
            <div className="menu-list" key={columnIndex}>
              {column.map((item) => (
                <div
                  className={`menu-list__item ${filter !== "all" && item.cat !== filter ? "is-hide" : ""}`}
                  key={item.name}
                >
                  <div className="menu-list__head">
                    <h3>{item.name}</h3>
                    <span className="menu-list__price">{item.price}</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <Reveal className="menu__note">
          <p>All prices are inclusive of VAT. Allergies? Just tell our waiter — we will adjust.</p>
          <a href="#reserve" className="btn btn--primary">Order Now</a>
        </Reveal>

      </div>
    </section>
  );
}
