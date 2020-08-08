import express from 'express';
import ClassesController from './controllers/ClassesController';


const routes = express.Router();
const classController = new ClassesController;

routes.get('/classes', classController.index); 
routes.post('/classes', classController.create); 

export default routes;
