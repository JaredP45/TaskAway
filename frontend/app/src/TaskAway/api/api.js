// Module Imports
import axios from 'axios';

const TASKAWAY_API_BASE_URL = "http://localhost:8001/tasks/";

class TaskAwayAPI {
    async createTask(uid, title, desc) {
        const response = await axios.post(`${TASKAWAY_API_BASE_URL}`, { 'title': title, 'description': desc })
        console.log(response);
    }

    async retrieveTask() {
        const response = await axios.get(`${TASKAWAY_API_BASE_URL}`);
        return response;
    }

    async updateTask(title, desc) {
        const response = await axios.put(`${TASKAWAY_API_BASE_URL}${title}?desc=${desc}`, { 'title': title, 'description': desc });
        console.log(response);
    }

    async deleteTask(title) {
        const response = await axios.delete(`${TASKAWAY_API_BASE_URL}${title}`);
        console.log(response);
    }
};

export default new TaskAwayAPI();