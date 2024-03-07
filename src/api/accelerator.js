import {serverInstance} from '../axios.config'; 

export async function migrateScript(body) {
    return await serverInstance.post('/BB/BBmigration', body);
}

export async function healthCheck() {
    return await serverInstance.get('/BB/hello');
}