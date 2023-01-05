import axios, { AxiosRequestConfig } from 'axios';
type Result<Ok, Err> =
  | {
      result: 'ok';
      data: Ok;
    }
  | { result: 'err'; data: Err };

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
});

export async function postService<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any> | undefined
): Promise<Result<T, string>> {
  try {
    const response = await api.post(url, data, config);
    return { result: 'ok', data: response.data };
  } catch (err) {
    console.log(err);
    return { result: 'err', data: (err as any).response.data };
  }
}
