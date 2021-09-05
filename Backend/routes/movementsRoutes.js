import {Router} from 'express';
import { getMovements, newMovement, deleteMovement, getLastTenMovements, updateMovement, getAllMovsByUser, getMovById} from '../controllers/movementsController';
import { validateUser, createUser } from '../controllers/loginController';
const router = Router();


router.get('/movements', getMovements);// get movements from database

router.get('/movements/last_ten/:id_user', getLastTenMovements); // get movements from database

router.get('/movements/all/:id_user', getAllMovsByUser);

router.get('/movements/id/:id', getMovById);

router.post('/movements', newMovement);

router.delete('/movements/:id_user/:id', deleteMovement);

router.put('/movements/:id', updateMovement);

router.post('/login', validateUser);

router.post('/signin', createUser);


export default router;