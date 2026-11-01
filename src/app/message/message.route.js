import {Router} from 'express';
import * as messageController from './message.controller.js'
import { guard } from '../../lib/auth/guard.js';

const messageRouter= Router();
messageRouter.post('/',messageController.sendMessage )
messageRouter.post('/public',guard , messageController.sendMessage )
messageRouter.get('/',guard, messageController.getAllMessages)


export default messageRouter;
