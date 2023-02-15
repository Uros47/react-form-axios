import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { getCompanionsData } from "../../service/loginApiCalls";
import { AuthContext } from "../../context/AuthContext";

const Companions = () => {
  const [responseData, setResponseData] = useState();
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getCompanionsData(token)
      .then((response) => {
        setResponseData(response);
      })

      .catch((error) => {
        console.log(error.status);
      });
  }, []);

  if (!responseData) {
    return <div className="loading">...Loading</div>;
  } else
    return (
      <div className="companions">
        {responseData.map((el) => (
          <div className="companion-names" key={el.id}>
            {el.handle}
          </div>
        ))}
        <button className="logout" onClick={logOut}>
          Sign Out
        </button>
      </div>
    );
};

export default Companions;
