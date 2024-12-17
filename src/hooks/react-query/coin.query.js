import { useMutation, useQuery, useQueryClient } from "react-query"
import { fetchCoin } from "../../api/functions/fetchCoin"
import { fetchCoinById } from "../../api/functions/fetchCoinById"
import { updateCoin } from "../../api/functions/updateCoin"

export const useFetchCoin =()=>{
    return useQuery({
        queryKey:['coin'],
        queryFn:fetchCoin
    })
}

export const useFetchCoinById =(id)=>{
    return useQuery({
        queryKey:['coin',id],
        queryFn:()=>fetchCoinById(id)
    })
}

export const useUpdateCoin = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn :(data)=>updateCoin(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['coin']})
        }
    })
}