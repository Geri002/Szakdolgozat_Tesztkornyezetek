import express from 'express'
import Cars from '../models/CarsModel.js';
import Rent from '../models/RentModel.js';


const rentRouter = express.Router();

rentRouter.post('/rentcar', async (req, res) => {
    try{

        const newRent = new Rent(req.body);
        await newRent.save();

        const car = await Cars.findById({_id: req.body.car});
        car.foglaltidoszak.push(req.body.foglaltidoszak);
        await car.save();
        
        res.send('Az autó bérlésed sikeres volt!');

    }catch(error){
        return res.status(400).json(error);
    }
});

export default rentRouter;