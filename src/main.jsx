import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StarRating from "./components/StarRating.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <StarRating
      size={25}
      className="test"
      color="red"
      messages={["bad", "good1", "good2", "great", "amazon"]}
      defaultRating={2}
    /> */}
    <App />
  </React.StrictMode>
);
