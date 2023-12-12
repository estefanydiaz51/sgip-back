import axios, { type AxiosError } from 'axios'

interface BaseInvokeDto {
  url: string
  headers?: any
  body?: any
}

interface BaseReturnDto {
  success: boolean
  status?: number
  data?: any
  online?: boolean
}

class Invoke {
  async get(data: BaseInvokeDto): Promise<BaseReturnDto> {
    try {
      const r = await axios.get(data.url, { headers: data.headers })

      return { success: true, status: r.status, data: r.data }
    } catch (error) {
      const axiosError = error as AxiosError
      console.log(axiosError.response?.status, axiosError?.response?.data)
      if (axiosError.response) {
        return {
          success: false,
          status: axiosError.response?.status,
          data: axiosError.response?.data
        }
      }

      return {
        success: false,
        online: false
      }
    }
  }

  async post(data: BaseInvokeDto): Promise<any> {
    try {
      const r = await axios.post(data.url, data.body, {
        headers: data.headers
      })

      return {
        success: true,
        status: r.status,
        data: r.data
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.log(axiosError.response?.status, axiosError?.response?.data)

      if (axiosError.response) {
        return {
          success: false,
          status: axiosError.response?.status,
          data: axiosError.response?.data
        }
      }

      return {
        success: false,
        online: false
      }
    }
  }
}

export const Fetch = new Invoke()
