import axios from "axios";
import { useEffect, useState } from "react";
// NOT USED IN APP /////
const useAxiosGet = (url, token) => {
  const [responseData, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    axios
      .get(url, {
        headers: { Authorization: `bearer${token}` },
      })
      .then((response) => {
        setResponse(response.data.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.error("axios error", error);
        setIsLoading(false);
        setError(error);
      });
  }, [url, token]);

  return { responseData, error, isLoading };
};

export default useAxiosGet;
