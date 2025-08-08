import { useEffect, useState } from "react";
import axios from "axios";
import { getRequestBody } from "../utils/getRequestBody";

const useTechDocData = () => {
  const [techDocDataObj, setTechDocDataObj] = useState(null);
  const endpoint = `/api/nuvo/story_tech_doc/getStoryTechDocData`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.post(endpoint, getRequestBody());

        setTechDocDataObj(response.data?.result || null);
      } catch (error) {
        console.error("Axios error:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  return techDocDataObj;
};

export default useTechDocData;
