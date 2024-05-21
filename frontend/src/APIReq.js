import axios from "axios";

const HOST = "http://127.0.0.1:5000"
export class APIReq {
    async getRequest(path){
        const token = document.cookie.replace("Authorization=", "");
        try {
            const head = {
                'Content-Type' : 'application/json'
            };

            if (token) {
                head.Authorization = `Bearer ${token}`;
            }

            const config = {
                method: 'GET',
                headers: head
            };
            
            const response = await fetch(`${HOST}${path}`, config);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return response.status;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    // POST request function
    async postRequest(path, body){
        const token = document.cookie.replace("Authorization=", "");
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            const response = await axios.post(`${HOST}${path}`, body, config);

            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async putRequest(path, body){
        const token = document.cookie.replace("Authorization=", "");
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            const response = await axios.put(`${HOST}${path}`, body, config);

            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async deleteRequest(path){
        const token = document.cookie.replace("Authorization=", "");
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            const response = await axios.delete(`${HOST}${path}`, config);

            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    }
        
}
