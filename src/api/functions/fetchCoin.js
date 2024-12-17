import { axiosInstance } from "../axiosInstance/axiosInstance"
import { endPoints } from "../endPoints/endPoints"

export const fetchCoin = async()=>{
    try {
        const {data} = await axiosInstance.get(endPoints.getCoins)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        
    }
}