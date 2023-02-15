import axios from "axios";

export const postPhoto = async (data, token) => {
    try {
        const response = await axios.post(
            "https://staging-api-p411.quantox.dev/api/admirers/settings/photos",
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getPhoto = async (token) => {
    try {
        const response = await axios.get(
            "https://staging-api-p411.quantox.dev/api/admirers/settings/photos",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
