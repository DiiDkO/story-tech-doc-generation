import React, { useEffect, useState } from "react";
import useTechDocData from "../hooks/useTechDocData";
import { generateXLSXFile } from "../utils/generateXLSFile";
const XSLXFileGeneration = () => {
  const techDocDataObj = useTechDocData();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (techDocDataObj && !done) {
      const generateAndClose = async () => {
        await generateXLSXFile(techDocDataObj);
        setDone(true);
      };

      generateAndClose();
    }
  }, [techDocDataObj, done]);

  if (!techDocDataObj) {
    return <p className="p-1 bg-green-600 text-white rounded shadow">Loading...</p>;
  }

  return (
    <p className="p-1 bg-green-600 text-white rounded shadow">
      Technical Documentation Generated.
    </p>
  );
};
 
export default XSLXFileGeneration;
