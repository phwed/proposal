import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles.css";

const carousel = (slider) => {
  const z = 300;
  function rotate() {
    const deg = 360 * slider.track.details.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on("detailsChanged", rotate);

  let timeout: number | undefined | any;
  let mouseOver = false;
  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 4000);
  }
  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

export default function App() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      selector: ".carousel__cell",
      mode: "free-snap",
      renderMode: "custom",
      drag: true,
      defaultAnimation: {
        duration: 4000,
      },
    },
    [carousel]
  );

  return (
    <div className="wrapper h-[100dvh] flex flex-col justify-center items-center gap-10 relative p-10">
      <div className="scene">
        <div className="carousel keen-slider" ref={sliderRef}>
          <div className="carousel__cell number-slide1" />
          <div className="carousel__cell number-slide2" />
          <div className="carousel__cell number-slide3" />
          <div className="carousel__cell number-slide4" />
          <div className="carousel__cell number-slide5" />
          <div className="carousel__cell number-slide6" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-5">
        <h1 className="mt-8 font-title text-2xl">Dear Josie,</h1>

        <p className="font-sans text-sm">
          Words will fail me if I try to describe how much you mean to me. You
          are the most beautiful, kind, and loving person I have ever met. You
          are my best friend, my partner in Christ, and my soulmate. I am so
          lucky to have you in my life. I love you so much. There is no one more
          i would want to face the world with than you. I want to spend the rest
          of my life with you. I want to build a family with you. I want to grow
          old with you. I want to be with you forever.
        </p>

        <p className="font-sans text-sm">
          Thank you for being you. Thank you for being my Josie. Thank you for
          being my LOVE.
        </p>
      </div>
    </div>
  );
}
