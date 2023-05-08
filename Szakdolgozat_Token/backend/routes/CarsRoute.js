import express from 'express'
import Cars from '../models/CarsModel.js';


const carsRouter = express.Router();

carsRouter.get('/getall', async (req, res) => {
    const cars = await Cars.find();
    res.send(cars);
});

//autó id alapján
carsRouter.get('/cars/:carId', async (req, res) => {
    const car = await Cars.findById({_id:req.params.carId});
    if(car){
        res.send(car);
    } else {
        res.status(404).send({message: 'Az autó nem található'});
    }
});

export default carsRouter;