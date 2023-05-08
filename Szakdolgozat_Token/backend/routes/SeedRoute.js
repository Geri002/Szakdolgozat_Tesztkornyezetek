import express from 'express'
import data from '../data.js';
import Cars from '../models/CarsModel.js';
import Category from '../models/TypeModel.js';


const seedRouter = express.Router();


seedRouter.get('/', async (req, res) =>{
    await Cars.deleteMany({});
    const createdCars = await Cars.insertMany(data.cars);

    await Category.deleteMany({});
    const createdCategory = await Category.insertMany(data.kategoria);

    res.send({createdCars, createdCategory});
});


export default seedRouter;