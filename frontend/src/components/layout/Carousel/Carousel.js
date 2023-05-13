import { React, useState } from "react";
import "./carousel.css";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    src: "https://c4.wallpaperflare.com/wallpaper/310/517/123/hot-air-balloon-flying-above-the-body-of-water-wallpaper-preview.jpg",
    caption:"Buy 100% organic crops and chemical-free crops ar cheap rates on one click"
              ,
    
    
    width: "1200px",
  },
  {
    src: "https://c4.wallpaperflare.com/wallpaper/314/561/208/5bd28efa2eb6a-wallpaper-preview.jpg",
    // altText: "Slide 2",
    caption: "Become seller by sitting at home and sell your farming products and crops",
    width: "1200px",
  },
  {
    src: "https://c4.wallpaperflare.com/wallpaper/549/835/824/nature-wheat-field-cereal-wallpaper-preview.jpg",
    // altText: "Slid",
    caption: "Eat Fresh, Live Fresh! Because Every Health Matters! Our farmers try their best to provide you fresh crops",
    width: "1200px",
  },
];

const CarouselComponent = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img
          src={item.src}
          alt={item.altText}
          style={{ width: "100%", height: "625px" }}
        />
        <CarouselCaption
          captionText={item.caption}
          // captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      style={{ width: "100%", height: "100%" }}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default CarouselComponent;
