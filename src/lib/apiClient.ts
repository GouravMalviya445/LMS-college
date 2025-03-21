import axios from 'axios';
import { config } from "@/config";

const apiClient = axios.create({
  baseURL: config.backendUrl,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});


const _GET = (url: string) => apiClient.get(url);
const _POST = (url: string, data: any) => apiClient.post(url, data);
const _PUT = (url: string, data: any) => apiClient.put(url, data);
const _DELETE = (url: string) => apiClient.delete(url);

export { apiClient, _GET, _POST, _PUT, _DELETE };