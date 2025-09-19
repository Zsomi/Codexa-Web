'use client';

import { ToastContainer } from 'react-toastify';

export default function ToastWrapper() {
  return (
    <ToastContainer 
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastClassName="!bg-gray-800/80 !backdrop-blur-sm !border !border-blue-500/30 !text-white !rounded-xl !shadow-2xl !shadow-blue-500/20"
      className="!top-20 !right-4"
      progressClassName="!bg-gradient-to-r !from-blue-400 !to-blue-600"
    />
  );
}
