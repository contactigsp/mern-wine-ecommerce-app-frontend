import React from "react";
import CardCategory from "../Card/CardCategory";
import "./Categories.css";

function Categories() {
  const categories = [
    {
      id: 1,
      image: "/img/mock-ups/mock-up1.jpeg",
      name: "Gifts",
      slug: "gifts",
    },
    { id: 2, image: "/img/mock-ups/mock-up5.png", name: "Kits", slug: "kits" },
    {
      id: 3,
      image: "/img/mock-ups/mock-up3.png",
      name: "Combos",
      slug: "combos",
    },
    {
      id: 4,
      image: "/img/mock-ups/mock-up2.jpeg",
      name: "Wooden Box",
      slug: "wood",
    },
  ];
  return (
    <>
      <h2 className="Categories-title">Categories</h2>
      <div className="Categories">
        {categories.map((card) => (
          <CardCategory key={card.id} image={card.image} name={card.name} slug={card.slug} />
        ))}
      </div>
    </>
  );
}

export default Categories;
