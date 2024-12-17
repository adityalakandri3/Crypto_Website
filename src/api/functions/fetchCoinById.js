import { axiosInstance } from "../axiosInstance/axiosInstance"
import { endPoints } from "../endPoints/endPoints"

export const fetchCoinById = async (id)=>{
    try {
        const {data} = await axiosInstance.get(endPoints.getCoinsById(id)) ;
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}