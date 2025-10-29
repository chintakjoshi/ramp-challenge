// solution
import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [flag, setFlag] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch the flag on component mount
  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch(
          "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/73756e"
        );
        const text = await response.text();
        setFlag(text);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flag:", error);
        setLoading(false);
      }
    };

    fetchFlag();
  }, []);

  // Typewriter effect after flag is loaded
  useEffect(() => {
    if (!loading && flag && currentIndex < flag.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + flag[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 500); // Half second delay

      return () => clearTimeout(timer);
    }
  }, [loading, flag, currentIndex]);

  if (loading) {
    return <div>Loading</div>;
  }

  return <div>{displayText}</div>;
}