import axios from "axios";
import { useEffect, useState } from "react";

const useFetchApi = (url)=>{
    const [data,setData]= useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    const fetchData = async()=>{
        setLoading(true);
        try {
            const response = await axios.get(url);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchData();
    },[url])
    return{data,loading,error};

}
export default useFetchApi;