import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
export const saveAddress = async (data) => {
  const url = `${apiUrl}/api/users/addNewAddress`;
  try {
    const result = await axios.post(url, data);
    if (result.status === 201) {
      return result.data.address;
    } else if (result.status === 400) {
      throw new Error("Bad Request");
    } else if (result.status === 404) {
      throw new Error("Not Found");
    } else {
      throw new Error("Server Error");
    }
  } catch (error) {
    throw error;
  }
};
