import axios from "axios";
export const fetchGet= async(url)=>{
    try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
}