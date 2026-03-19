import { useEffect } from "react";

export default function Notification({ message, clear }) {
  useEffect(() => {
    const timer = setTimeout(clear, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="notification">
      {message}
    </div>
  );
}