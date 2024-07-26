import { DOLAR_API } from "../constants/constants";
import axios from "axios";

export const getAll = async () => {
    try {
        const response = await axios.get(`${DOLAR_API}/v1/dolares`);
        return response.data;
    } catch (error) {
        console.error("Error fetching dolar oficial", error);
        return error.response.data
    }
}