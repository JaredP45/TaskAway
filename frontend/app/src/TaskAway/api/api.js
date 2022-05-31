// Module Imports
import axios from 'axios';

const TASKAWAY_API_BASE_URL = "http://localhost:8001/tasks/";

class TaskAwayAPI {
    async createTask(title, desc, isComplete) {
        const response = await axios.post(`${TASKAWAY_API_BASE_URL}`, { 
            'title': title, 
            'description': desc,
            "created_on": "2022-05-28T00:00:00",
            "expires_on": "2022-05-28T00:00:00",
            "completed_on": "2022-05-28T00:00:00", 
            'completed': isComplete 
        });
        console.log(response);
    }

    async retrieveTask() {
        const response = await axios.get(`${TASKAWAY_API_BASE_URL}`);
        return response;
    }

    async updateTask(id, title, desc, isComplete) {
        const response = await axios.put(`${TASKAWAY_API_BASE_URL}${id}`, { 
            'title': title, 
            'description': desc,
            "created_on": "2022-05-28T00:00:00",
            "expires_on": "2022-05-28T00:00:00",
            "completed_on": "2022-05-28T00:00:00",
            'completed': isComplete
        });
        console.log(response);
    }

    async deleteTask(id) {
        const response = await axios.delete(`${TASKAWAY_API_BASE_URL}${id}`);
        console.log(response);
    }
};

export default new TaskAwayAPI();