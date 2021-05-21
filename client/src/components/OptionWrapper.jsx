import React, { useEffect, useRef, useState } from "react";

const shuffle = (array) => {
   let currentIndex = array.length,
      temporaryValue,
      randomIndex;

   // While there remain elements to shuffle...
   while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }

   return array;
};

const OptionWrapper = ({
   options,
   onSelect,
   isLoading,
   correctAnswer,
   onQuestionChange,
}) => {
   const answerRef = useRef(null);
   const nullRef = useRef(null);
   // const [prevAnswer, setPrevAnswer] = useState();
   // const [prevAnswerPos, setPrevAnswerPos] = useState();
   const [jumbledOptions, setJumbledOptions] = useState([]);

   useEffect(() => {
      setJumbledOptions(shuffle(options));
   }, [options]);

   return (
      <div className="options-wrapper mt-4">
         {jumbledOptions &&
            jumbledOptions.map((e, i) => (
               <button
                  key={`${e}-${i}`}
                  className="options btn btn-secondary"
                  disabled={isLoading}
                  onClick={(e) => onSelect(e, answerRef)}
                  ref={e === correctAnswer ? answerRef : nullRef}
               >
                  {e}
               </button>
            ))}
      </div>
   );
};

export default OptionWrapper;
