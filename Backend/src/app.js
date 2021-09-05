'use strict'
import express from 'express';
import config from './config.js';
import movementsRoutes from '../routes/movementsRoutes';
import loginRoutes from '../routes/loginRoutes';


const app = express();


// settings
app.set('port', config.port || 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(movementsRoutes);
app.use(loginRoutes)




export default app;