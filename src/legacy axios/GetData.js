import axios from "axios";

class GetData {
  async postLoginData(data) {
    try {
      const response = await axios.post(
        "https://dev-api-p411.quantox.dev/api/admirers/login",
        data
      );
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error, "postLoginData");
    }
  }

  async getLoginData(token) {
    const response = await axios.get(
      "https://dev-api-p411.quantox.dev/api/companions?page=1&show=12",
      {
        headers: { Authorization: `bearer${token}` },
      }
    );
    if (response) {
      return response;
    }
  }
  catch(error) {
    console.log(error, "getLoginData");
  }
}

const getData = new GetData();
export default getData;
