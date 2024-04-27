import type {AxiosRequestConfig, AxiosResponse} from 'axios';
import axios from 'axios';

const getRequest = async <T = any>(
  url: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.get<T>(url, options);

    return response;
  } catch (error) {
    console.log(`Request failed: ${url}`, error);

    throw error;
  }
};

export {getRequest};
