/* ============================================================
   5. SIGNATURE DISHES — card grid with filter tabs
   (All / Breakfast / Lunch / Dinner / Drinks) and a heart button
============================================================ */

import { useState } from "react";

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { useToast } from "./Toast";

const TABS = [
  { key: "all", label: "All" },
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "drinks", label: "Drinks" },
];

const DISHES = [
  {
    cat: "dinner",
    image: "/images/img-06.jpg",
    alt: "Grilled Ribeye Steak",
    name: "Grilled Ribeye Steak",
    price: "৳1250",
    text: "Slow-grilled premium beef with herb butter and roasted vegetables.",
    stars: "★★★★★",
    rating: "4.9",
    time: "25 min",
    badge: "Chef's Pick",
  },
  {
    cat: "dinner",
    image: "/images/img-07.jpg",
    alt: "Creamy Alfredo Pasta",
    name: "Creamy Alfredo Pasta",
    price: "৳680",
    text: "Fettuccine tossed in silky parmesan cream with grilled chicken.",
    stars: "★★★★★",
    rating: "4.8",
    time: "18 min",
  },
  {
    cat: "lunch",
    image: "/images/img-08.jpg",
    alt: "Margherita Pizza",
    name: "Margherita Pizza",
    price: "৳550",
    text: "Wood-fired thin crust with tomato, mozzarella and basil leaves.",
    stars: "★★★★☆",
    rating: "4.6",
    time: "20 min",
    badge: "Popular",
  },
  {
    cat: "lunch",
    image: "/images/img-09.jpg",
    alt: "Chicken Biryani",
    name: "Chicken Biryani",
    price: "৳420",
    text: "Fragrant basmati rice layered with spiced chicken and saffron.",
    stars: "★★★★★",
    rating: "4.9",
    time: "30 min",
  },
  {
    cat: "breakfast",
    image: "/images/img-10.jpg",
    alt: "Avocado Toast Platter",
    name: "Avocado Toast Platter",
    price: "৳380",
    text: "Sourdough bread, smashed avocado, poached egg and cherry tomato.",
    stars: "★★★★☆",
    rating: "4.5",
    time: "12 min",
  },
  {
    cat: "breakfast",
    image: "/images/img-11.jpg",
    alt: "Pancake Berry Stack",
    name: "Pancake Berry Stack",
    price: "৳350",
    text: "Fluffy pancakes, seasonal berries, honey and a dust of icing sugar.",
    stars: "★★★★★",
    rating: "4.7",
    time: "15 min",
  },
  {
    cat: "drinks",
    image: "/images/img-12.jpg",
    alt: "Fresh Mango Smoothie",
    name: "Fresh Mango Smoothie",
    price: "৳220",
    text: "Seasonal mango blended with yogurt, honey and a hint of mint.",
    stars: "★★★★☆",
    rating: "4.6",
    time: "8 min",
  },
  {
    cat: "drinks",
    image: "/images/img-13.jpg",
    alt: "Iced Caramel Latte",
    name: "Iced Caramel Latte",
    price: "৳280",
    text: "Double espresso, cold milk and house-made caramel over ice.",
    stars: "★★★★★",
    rating: "4.8",
    time: "6 min",
    badge: "New",
  },
];

export default function Dishes() {
  const [filter, setFilter] = useState("all");
  const [liked, setLiked] = useState([]); // names of the dishes saved with the heart
  const showToast = useToast();

  function toggleLike(name) {
    const isLiked = liked.includes(name);

    setLiked(isLiked ? liked.filter((item) => item !== name) : [...liked, name]);
    showToast(isLiked ? "Removed from favourites." : "Dish saved to your favourites!");
  }

  return (
    <section className="section dishes" id="dishes">
      <div className="container">

        <SectionHead
          tag="Our Speciality"
          title={<>Signature <em>Dishes</em></>}
          text="Handpicked favourites loved by thousands of our guests."
        />

        {/* Filter tabs */}
        <Reveal className="tabs">
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

        <div className="dishes__grid">
          {DISHES.map((dish, i) => {
            const hidden = filter !== "all" && dish.cat !== filter;

            return (
              <Reveal
                as="article"
                key={dish.name}
                className={`dish-card ${hidden ? "is-hide" : ""}`}
                delay={(i % 4) * 90}
              >
                <div className="dish-card__thumb">
                  <img src={dish.image} alt={dish.alt} loading="lazy" />
                  {dish.badge && <span className="dish-card__badge">{dish.badge}</span>}

                  <button
                    className={`dish-card__fav ${liked.includes(dish.name) ? "is-liked" : ""}`}
                    aria-label="Save"
                    onClick={() => toggleLike(dish.name)}
                  >
                    {liked.includes(dish.name) ? "♥" : "♡"}
                  </button>
                </div>

                <div className="dish-card__body">
                  <div className="dish-card__top">
                    <h3>{dish.name}</h3>
                    <span className="dish-card__price">{dish.price}</span>
                  </div>

                  <p>{dish.text}</p>

                  <div className="dish-card__meta">
                    <span className="stars">{dish.stars} <em>{dish.rating}</em></span>
                    <span className="dish-card__time">◷ {dish.time}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
