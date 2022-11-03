import missile from "../../assets/missle.png";
import { useState, useEffect } from "react";

export default function Missile(props) {
  console.log(props);
  const { left, height, width } = props;
  // tracks the missles y position
  const [bottom, setBottom] = useState(300 + 80); // adds spaceship height

  /**
   * This handles the y movement of the all the missiles
   */
   useEffect(() => {
    setTimeout(() => {
      setBottom(bottom + 3);
    }, 1);
  }, [bottom]);

  return (
    <img
      alt="bullet"
      src={missile}
      style={{
        position: "absolute",
        bottom,
        left,
        width,
        height,
      }}
    />
  );
}
