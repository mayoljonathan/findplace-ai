import { useEffect, useState } from "react";

const SEARCH_MESSAGE_EXAMPLES = [
  "I'm craving some good pizza. Can you find a budget-friendly pizza spot in IT Park Cebu that's open right now",
  "Find me a Tennis court in Cebu City",
  "I'm looking for a good place to have a coffee in Mandaue City that is still open tonight",
  "Give me some recommendations for museums in Philippines",
];

export const useSearchMessagePlaceholder = (options?: {
  cycleDuration?: number;
}) => {
  const { cycleDuration = 5000 } = options ?? {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SEARCH_MESSAGE_EXAMPLES.length);
        setIsTransitioning(false);
      }, 500);
    }, cycleDuration);

    return () => clearInterval(interval);
  }, []);

  return {
    placeholder: SEARCH_MESSAGE_EXAMPLES[currentIndex],
    className: isTransitioning ? "placeholder-transition" : "",
  };
};
