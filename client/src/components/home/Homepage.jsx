import React, { useEffect, useState } from "react";
import CodeContainer from "../CodeContainer";
import axios from "axios";
import OptionWrapper from "../OptionWrapper";
import Spinner from "../Spinner";
import Navbar from "../Navbar";
import firebase from "firebase/app";
import GameOverModal from "../GameOverModal";

const randomLanguages = [
   "Python",
   "JavaScript",
   "Java",
   "C++",
   "C#",
   "Lua",
   "Haskell",
   "Rust",
   "HTML",
   "CSS",
   "Swift",
   "Powershell",
   "Clojure",
   "TSX",
   "TypeScript",
   "Dart",
   "Go",
   "PHP",
   "Ruby",
];

const Homepage = () => {
   const [gistUrl, setGistUrl] = useState();
   const [currGistLang, setCurrGistLang] = useState();
   const [gistArr, setGistArr] = useState([]);
   const [currGistNum, setCurrGistNum] = useState(0);
   const [options, setOptions] = useState();
   const [isLoading, setIsLoading] = useState();
   const [pageNumCompleted, setPageNumCompleted] = useState([]);
   const [gameFinished, setGameFinished] = useState(false);
   const [score, setScore] = useState(0);
   const [lastTopScorer, setLastTopScorer] = useState(0);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [showGameOverModal, setShowGameOverModal] = useState(false);
   const [user, setUser] = useState();

   useEffect(() => {
      setIsLoading(true);
      findGist();
      // getLastTopScorer();
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            setIsLoggedIn(true);
            setUser(user);
         } else {
            setIsLoggedIn(false);
         }
         setIsLoading(false);
      });
      return;
      // eslint-disable-next-line
   }, []);

   useEffect(() => {
      axios
         .get("/api/top-scorers")
         .then((res) => {
            const scores = res.data.data;
            setLastTopScorer(scores[scores.length - 1].score);
         })
         .catch((err) => console.error(err));
   }, []);

   const findGist = () => {
      setIsLoading(true);
      const randomPageNum = Math.floor(Math.random() * 100);
      if (pageNumCompleted.includes(randomPageNum)) {
         findGist();
         return;
      }
      let newArr = pageNumCompleted;
      newArr.push(randomPageNum);
      setPageNumCompleted(newArr);
      const url = `https://api.github.com/gists/public?page=${randomPageNum}`;
      axios
         .get(url)
         .then((res) => {
            const bestGists = findBestGist(res.data);
            setGistArr(bestGists);
            setCurrGistNum(0);
            setGistUrl(bestGists[0].html_url + ".js");
            const fileObj = Object.entries(bestGists[0].files);
            const language = fileObj[0][1].language;
            if (language) {
               setCurrGistLang(language);
               getOptions(language);
            }
            setIsLoading(false);
         })
         .catch((err) => console.error(err));
   };

   const getOptions = (language) => {
      const randomOptions = randomLanguages.sort(() => 0.5 - Math.random());
      const selectedArray = randomOptions.slice(0, 3);
      if (selectedArray.includes(language)) {
         selectedArray.push(
            randomLanguages[Math.random() * randomLanguages.length]
         );
         return;
      }
      selectedArray.push(language);
      selectedArray.sort(() => 0.5 - Math.random());
      setOptions(selectedArray);
   };

   const showNextPage = (e, answerRef) => {
      console.log(`Input:- ${e.target.innerText} Answer:- ${currGistLang}`);
      if (currGistNum < gistArr.length - 1) {
         setIsLoading(true);
         if (e.target.innerText === currGistLang) {
            e.target.classList.remove("btn-secondary");
            e.target.classList.add("btn-success");
            setScore(score + 10);
            setTimeout(() => {
               setCurrGistNum(currGistNum + 1);
               setGistUrl(gistArr[currGistNum + 1].html_url + ".js");
               const fileObj = Object.entries(gistArr[currGistNum + 1].files);
               const language = fileObj[0][1].language;
               if (language) {
                  setCurrGistLang(language);
                  getOptions(language);
               }
               setIsLoading(false);
            }, 1000);
         } else {
            if (answerRef.current) {
               answerRef.current.classList.remove("btn-secondary");
               answerRef.current.classList.add("btn-success");
            }
            e.target.classList.add("btn-danger");
            setShowGameOverModal(true);
            setGameFinished(true);
         }
      } else {
         findGist();
      }
   };

   const findBestGist = (gistArray) => {
      const singleFileGists = gistArray.filter(
         (e) => Object.entries(e.files).length === 1
      );
      // eslint-disable-next-line
      const filteredGists = singleFileGists.filter((e) => {
         const fileArr = Object.entries(e.files);
         const element = fileArr[0][1];
         if (
            element.language !== null &&
            element.language !== "Text" &&
            element.language !== "Markdown" &&
            element.language !== "Jupyter Notebook"
         ) {
            return e;
         }
      });
      return filteredGists;
   };

   const handleQuestionChange = () => {
      findGist();
   };

   return (
      <>
         <Navbar isLoggedIn={isLoggedIn} />
         <div className="container text-center">
            <h1>SCORE: {score}</h1>
            <h3>Guess the programming language</h3>
            {!gameFinished && isLoading ? (
               <Spinner />
            ) : (
               gistUrl && <CodeContainer gistUrl={gistUrl} />
            )}
            {options && (
               <OptionWrapper
                  options={options}
                  isLoading={isLoading}
                  onSelect={showNextPage}
                  correctAnswer={currGistLang}
                  onQuestionChange={() => handleQuestionChange()}
               />
            )}
            <GameOverModal
               onShow={showGameOverModal}
               onClose={() => setShowGameOverModal(false)}
               score={score}
               lastTopScorer={lastTopScorer}
               isLoggedIn={isLoggedIn}
               user={user}
            />
         </div>
      </>
   );
};

export default Homepage;
