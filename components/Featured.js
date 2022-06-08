import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Featured.module.css";

const Featured = () => {
  const [index, setIndex] = useState(0);

  // when click arrow button slider image will be changed.
  function handleSlider(direction) {
    if (direction === "rightArrow") {
      // index !== 0 ? index - 1 : 2
      setIndex(index >= 0 && index < 2 ? index + 1 : 0);
    }
    if (direction === "leftArrow") {
      // index !== 2 ? index+1 : 0
      setIndex(index > 0 ? index - 1 : 2);
    }
  }

  // all images address from public folder
  const images = [
    "/images/featured.png",
    "/images/featured2.png",
    "/images/featured3.png",
  ];

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: "0" }}
        onClick={() => handleSlider("leftArrow")}
      >
        <Image
          src="/images/arrowl.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, index) => (
          <div className={styles.imgContainer} key={index}>
            <Image
              src={img}
              alt="feature img"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: "0" }}
        onClick={() => handleSlider("rightArrow")}
      >
        <Image
          src="/images/arrowr.png"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Featured;
