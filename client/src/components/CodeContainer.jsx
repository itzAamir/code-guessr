import React, { useEffect, useRef } from "react";
import postscribe from "postscribe";

const CodeContainer = (props) => {
   const codeDivRef = useRef();

   useEffect(() => {
      codeDivRef.current.innerText = "";
      postscribe("#code-div", `<script src=${props.gistUrl}></script>`);
   }, [props.gistUrl]);

   return <div id="code-div" ref={codeDivRef}></div>;
};

export default CodeContainer;
