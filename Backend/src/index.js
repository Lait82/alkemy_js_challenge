'use strict'
import app from './app.js';
import '../db/connection';

app.listen(app.get('port'));

console.log('server on port ', app.get('port'));
