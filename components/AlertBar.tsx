import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const AlertBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 w-full bg-red-600 text-white flex justify-between items-center p-3 text-center"
    >
      <img
        src="https://img.freepik.com/vecteurs-premium/moins-18-ans-icone-interdite-signe-illustration-vectorielle_503038-1112.jpg?semt=ais_hybrid"
        alt="Interdit aux moins de 18 ans"
        style={{ width: 25 }}
      />
      <span className="text-lg font-semibold flex-1 text-center">
        Les Paris Sportifs et de casino sont interdits aux mineurs
      </span>
      <button onClick={() => setIsVisible(false)} className="p-2">
        <X size={24} />
      </button>
    </motion.div>
  );
};

export default AlertBar;
