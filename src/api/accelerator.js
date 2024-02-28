import {serverInstance} from '../axios.config'; 

export async function migrateScript(body) {
    return await serverInstance.post('/migrations', body);
}