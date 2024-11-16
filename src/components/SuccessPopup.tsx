'use client';

import { useEffect } from 'react';

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-100 text-green-800 p-4 rounded-md shadow-md z-50">
      {message}
    </div>
  );
};

export default SuccessPopup;
