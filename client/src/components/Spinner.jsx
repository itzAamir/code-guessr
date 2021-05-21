import React from "react";

const Spinner = () => {
   return (
      <div
         style={{
            height: "50%",
            width: "50%",
            display: "grid",
            placeItems: "center",
         }}
      >
         <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
         </div>
      </div>
   );
};

export default Spinner;
