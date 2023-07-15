import React from "react";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeDisplay = () => {
  const { code } = useParams();

  return (
    <div>
      <h1>Your Generated Code</h1>
      <SyntaxHighlighter language="javascript" style={solarizedlight}>
        {decodeURIComponent(code)}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;
