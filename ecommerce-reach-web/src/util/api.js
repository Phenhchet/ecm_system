import { message } from "antd"
import axios from "axios"

const baseUrl = "http://localhost:8080/api/"



export const request = (method = "get", url = "", data = {}) => {
    return axios({
        url: baseUrl + url,
        method: method,
        data: data

    }).then(res => {
        return res
    }).catch(err => {
        // console.log(err)
        // return err
        if (err.code == "ERR_NETWORK") {
            message.error("Can not connect to server. Please contact Administration!")
            return false
        }
        return false
    })
}