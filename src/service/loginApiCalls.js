import axios from "axios";

export const postLoginFormData = async (data) => {
  try {
    const response = await axios.post("https://staging-api-p411.quantox.dev/api/admirers/login", data);
    if (response.status > 200 || response.status < 300) {
      localStorage.setItem("token", response.data.data.access_token);
      return response.data.data;
    }
  } catch (error) {
    console.log(error, "postLoginData");
  }
};

export const getCompanionsData = async (token) => {
  try {
    const response = await axios.get(
      "https://staging-api-p411.quantox.dev/api/companions?page=1&show=12",
      {
        headers: { Authorization: `Bearer ${token}` },

      }
    );
    if (response) {
      return response.data.data.data;
    }
  } catch (error) {
    console.log(error, "getLoginData");
  }
};
