import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import blogRoutes from './routers/blogRoutes.js';
import authenticateoRoutes from './routers/authenticateRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to ' + process.env.MONGODB);
});

app.use('/blogs', blogRoutes);
app.use('/token', authenticateoRoutes);

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
})

