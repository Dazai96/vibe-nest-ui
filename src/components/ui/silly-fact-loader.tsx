import { useState, useEffect } from "react";
import { Lightbulb, Sparkles } from "lucide-react";

const sillyFacts = [
  "Octopuses have three hearts and blue blood! 🐙",
  "A group of flamingos is called a 'flamboyance' 💃",
  "Bananas are berries, but strawberries aren't! 🍌",
  "Honey never spoils - archaeologists found 3000-year-old honey that's still edible! 🍯",
  "A shrimp's heart is in its head! 🦐",
  "Wombat poop is cube-shaped! 📦",
  "Sea otters hold hands while sleeping so they don't drift apart! 🦦",
  "Dolphins have names for each other! 🐬",
  "A group of pugs is called a 'grumble' 🐶",
  "Penguins propose to their mates with pebbles! 🐧💍",
  "Butterflies taste with their feet! 🦋",
  "A sneeze travels at 100 mph! 🤧",
  "Elephants can't jump - they're the only mammals that can't! 🐘",
  "Your nose can distinguish over 1 trillion different scents! 👃",
  "A group of hedgehogs is called a 'prickle' 🦔",
  "Cats have a special purr frequency that helps heal bones! 🐱",
  "A cloud can weigh over a million pounds! ☁️",
  "Sharks are older than trees! 🦈🌳",
  "The word 'set' has the most different meanings in English! 📚",
  "A group of owls is called a 'parliament' 🦉",
  "Bubble wrap was originally invented as wallpaper! 🫧",
  "The shortest war in history lasted only 38-45 minutes! ⏰",
  "Pizza was once considered peasant food in Italy! 🍕",
  "A group of crows is called a 'murder' 🐦‍⬛",
  "Avocados are technically berries, but rhubarb is a vegetable! 🥑",
  "The human brain uses 20% of the body's energy! 🧠",
  "A group of unicorns would be called a 'blessing' 🦄✨",
  "Rubber bands last longer when refrigerated! 🔗",
  "The immortal jellyfish can reverse its aging process! 🪼",
  "A sneeze can produce over 40,000 droplets! 💧"
];

interface SillyFactLoaderProps {
  showFact?: boolean;
  className?: string;
}

export const SillyFactLoader = ({ showFact = true, className = "" }: SillyFactLoaderProps) => {
  const [currentFact, setCurrentFact] = useState("");
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    // Set initial random fact
    const randomIndex = Math.floor(Math.random() * sillyFacts.length);
    setFactIndex(randomIndex);
    setCurrentFact(sillyFacts[randomIndex]);

    // Change fact every 3 seconds
    const interval = setInterval(() => {
      setFactIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % sillyFacts.length;
        setCurrentFact(sillyFacts[nextIndex]);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!showFact) return null;

  return (
    <div className={`animate-fade-in ${className}`}>
      <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        <span className="text-xs font-medium">Did you know?</span>
        <Lightbulb className="h-4 w-4 text-amber-500 animate-bounce" />
      </div>
      <p 
        key={factIndex}
        className="text-sm text-center max-w-md mx-auto animate-fade-in text-foreground/80 font-medium"
      >
        {currentFact}
      </p>
    </div>
  );
};

export default SillyFactLoader;