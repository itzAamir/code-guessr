import React, { useEffect, useState } from "react";
import axios from "axios";

const TopScoreWrapper = (props) => {
   return (
      <div className="top-scorer">
         <span
            style={{
               overflow: "hidden",
               whiteSpace: "nowrap",
               textOverflow: "ellipsis",
            }}
         >
            <span className="badge badge-light mr-2">#{props.position}</span>
            {props.username}
         </span>
         <span className="ml-2">{props.score}</span>
      </div>
   );
};

// const topScorers = [
//    {
//       username: "Aamir",
//       score: 150,
//    },
//    {
//       username: "Aamir2",
//       score: 140,
//    },
//    {
//       username: "Aamir3",
//       score: 130,
//    },
//    {
//       username: "Aamir4",
//       score: 120,
//    },
//    {
//       username: "Aamir5",
//       score: 110,
//    },
//    {
//       username: "Aamir6",
//       score: 100,
//    },
//    {
//       username: "Aamir7",
//       score: 90,
//    },
//    {
//       username: "Aamir8",
//       score: 80,
//    },
//    {
//       username: "Aamir9",
//       score: 70,
//    },
//    {
//       username: "Aamir10",
//       score: 60,
//    },
// ];

const LeaderBoard = () => {
   const [topScorers, setTopScorers] = useState([]);

   useEffect(() => {
      axios
         .get("/api/top-scorers")
         .then((res) => {
            if (res.data.message === "ok") {
               setTopScorers(res.data.data);
               return;
            }
         })
         .catch((err) => console.log(err));
   }, []);

   return (
      <>
         <div className="text-center">
            <h3>LEADERBOARD</h3>
            <hr />
         </div>
         <div className="top-score-wrapper">
            {topScorers &&
               topScorers.map((e, i) => (
                  <TopScoreWrapper
                     key={`${e}-${i}`}
                     position={i + 1}
                     username={e.username}
                     score={e.score}
                  />
               ))}
         </div>
      </>
   );
};

export default LeaderBoard;
