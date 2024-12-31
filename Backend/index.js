import express from 'express';
import cors from 'cors';
import db from './Database/db.js';
import intersectionRoutes from './Routes/intersectionROutes.js'
import router from './Routes/Routes.js';
import contactRoute from './Routes/contactRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import AuthRoutes from './Routes/Auth.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
db.connect();

app.use('/api/auth',AuthRoutes);
app.use('/api',router);
app.use('/api',intersectionRoutes);
app.use('/api',contactRoute);
app.use('/api',orderRoutes);

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
});
