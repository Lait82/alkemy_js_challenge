import router from './movementsRoutes'
import {validateUser, createUser} from '../controllers/loginController';


router.post('/login', validateUser);

router.post('/signin', createUser);

export default router;