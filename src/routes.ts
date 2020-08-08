import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';


const routes = express.Router();
const classController = new ClassesController;
const connectionController = new ConnectionController;


routes.get('/classes', classController.index); 
routes.post('/classes', classController.create); 

routes.get('/connections', connectionController.index);
routes.post('/connections', connectionController.create);

export default routes;
