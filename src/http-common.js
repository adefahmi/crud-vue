import axios from "axios";
import authHeader from "./services/auth-header";

export default axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    headers: {
        "Content-Type": "application/json",
        ...authHeader()
    }
});