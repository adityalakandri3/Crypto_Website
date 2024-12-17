import { axiosInstance } from "../axiosInstance/axiosInstance"
import { endPoints } from "../endPoints/endPoints"

export const updateCoin = async(newCoin)=>{
    try {
        const {data} = await axiosInstance.put(endPoints.updateCoins(newCoin.id),newCoin)
        return data;
    } catch (error) {
        console.log(error)
    }
}