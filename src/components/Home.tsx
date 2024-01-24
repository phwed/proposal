import React from "react";

export default function Home() {
  const MOODS = {
    YES: "happy",
    ERM: "erm",
    NO: "no",
  };

  const [mood, setMood] = React.useState(MOODS.ERM);
  const [noClickCount, setNoClickCount] = React.useState(0);

  React.useEffect(() => {
    if (mood === MOODS.NO) {
      const noButton = document.getElementById("no");
      // change the position of the no button to a random position
      noButton.style.position = "absolute";

      // get the width and height of the button
      const width = noButton.offsetWidth;
      const height = noButton.offsetHeight;

      // get the width and height of the window
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // get a random position for the button
      const x = Math.random() * (windowWidth - width);
      const y = Math.random() * (windowHeight - height);

      // set the position of the button
      noButton.style.left = `${x}px`;
      noButton.style.top = `${y}px`;

      // increase the no click count and reduce the opacity of the button by 10%
      setNoClickCount(noClickCount + 1);
      noButton.style.opacity = (1 - noClickCount * 0.5).toString();

      // set the mood back to erm
      setTimeout(() => {
        setMood(MOODS.ERM);
      }, 3500);
    }
  }, [mood]);

  React.useEffect(() => {
    if (mood === MOODS.YES) {
      setTimeout(() => {
        window.location.href = "/yes";
      }, 3500);
    }
  }, [mood]);

  return (
    <div className="bg-pink-200 h-[100dvh] flex flex-col justify-center items-center gap-10 relative">
      <h1 className="font-title text-4xl text-center">
        {mood === MOODS.ERM
          ? "Josie, will you marry me?"
          : mood === MOODS.YES
          ? "Yay!"
          : mood === MOODS.NO && noClickCount === 1
          ? "LOL I knew you will try to click no first"
          : mood === MOODS.NO && noClickCount === 2
          ? "You know you want to say yes :)"
          : mood === MOODS.NO && noClickCount === 3
          ? "LOL NICE TRY, BUT YOU HAVE TO SAY YES"
          : ""}
      </h1>

      <img
        src={
          mood === MOODS.YES
            ? "/yes.gif"
            : mood === MOODS.ERM
            ? "/erm.gif"
            : "/no.gif"
        }
      />

      <div className="flex gap-4">
        {/* a no button that runs away when you try to click it */}
        <button
          id="no"
          className="bg-pink-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setMood(MOODS.NO);
          }}
        >
          No
        </button>

        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-md"
          onClick={() => setMood(MOODS.YES)}
        >
          Yes
        </button>
      </div>
    </div>
  );
}
