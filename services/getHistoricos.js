import axios from "axios";
import { HISTORICO_API } from "../constants/constants";

const getOficialHistorico = async () => {
    try {
        const response = await axios.get(`${HISTORICO_API}/v1/cotizaciones/dolares/oficial`);
        return response.data;
    } catch (error) {
        console.error("Error fetching dolar oficial", error);
        return error.response.data
    }
}

const getBlueHistorico = async () => {
    try {
        const response = await axios.get(`${HISTORICO_API}/v1/cotizaciones/dolares/blue`);
        return response.data;
    } catch (error) {
        console.error("Error fetching dolar blue", error);
        return error.response.data
    }
}

const historicosServices = {
    getOficialHistorico,
    getBlueHistorico
}

export {historicosServices}
