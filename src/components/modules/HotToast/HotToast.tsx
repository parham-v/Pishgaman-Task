import React from 'react'
import { Toaster } from "react-hot-toast";

function HotToast() {
  return (
    <Toaster
        containerStyle={{ top: "5vh" }}
        containerClassName="font-DanaMedium"
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: { color: "#fff", minWidth: "fit-content" },
          success: { style: { backgroundColor: "#16a34a" } },
          error: {
            style: { backgroundColor: "#ef4444" },
            iconTheme: { primary: "#b91c1c", secondary: "#fff" },
          },
          loading: {
            style: { backgroundColor: "#eab308" },
            iconTheme: { primary: "#eab308", secondary: "#fff" },
          },
        }}
      />
  )
}

export default HotToast