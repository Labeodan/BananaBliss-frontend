import { useState, useEffect } from "react";
import styles from "./Loading.module.scss"

function Loading() {
    const messages = [
        "Mixing the batter...",
        "Preheating the oven...",
        "Checking for ripe bananas...",
        "Slicing up the banana bread...",
        "Adding a dash of cinnamon...",
        "Perfecting the golden crust...",
        "Almost ready to serve...",
        "Sprinkling on some walnuts..."
    ];
    

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 3500); 

        return () => clearInterval(interval);
    }, [messages.length]);
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.spinner}></div>
      <p>{messages[currentMessageIndex]}</p>
    </div>
  );
}

export default Loading;
