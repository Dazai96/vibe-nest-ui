import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        >
          <div className="m-2 px-3 py-1.5 rounded-md text-sm bg-amber-500 text-white shadow">
            You are offline. Some actions will be queued.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


