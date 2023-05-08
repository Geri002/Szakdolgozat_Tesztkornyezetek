import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import seedRouter from './routes/SeedRoute.js';
import carsRouter from './routes/CarsRoute.js';
import rentRouter from './routes/RentRoute.js';
import categoryRouter from './routes/TypeRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/seed/', seedRouter);
app.use('/api/cars/', carsRouter);
app.use('/api/rent/', rentRouter);
app.use('/api/category/', categoryRouter);

//Csatlakozás az adatbázishoz
dotenv.config();
await mongoose.connect(process.env.MONGODB_URI)
.then(() => {

    console.log("Sikeres kapcsólódás az adatbázishoz.");

}).catch((error) => {
    console.log(error.message);
})

//Port készítés
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at: http://localhost:${port}`);
})