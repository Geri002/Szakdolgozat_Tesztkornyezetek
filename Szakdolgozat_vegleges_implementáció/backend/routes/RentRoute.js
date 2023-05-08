import express from 'express'
import Cars from '../models/CarsModel.js';
import Rent from '../models/RentModel.js';


const rentRouter = express.Router();

rentRouter.post('/rentcar', async (req, res) => {
    try {
      const { car, foglaltidoszak } = req.body;
  
      const existingRent = await Rent.findOne({
        car,
        $or: [
          { 'foglaltidoszak.from': { $lte: foglaltidoszak.from }, 'foglaltidoszak.to': { $gte: foglaltidoszak.from } },
          { 'foglaltidoszak.from': { $lte: foglaltidoszak.to }, 'foglaltidoszak.to': { $gte: foglaltidoszak.to } },
          { 'foglaltidoszak.from': { $gte: foglaltidoszak.from }, 'foglaltidoszak.to': { $lte: foglaltidoszak.to } },
        ],
      });
  
      if (existingRent) {
        return res.status(400).json({ msg: 'Az autó már ki van bérelve erre az időszakra!' });
      }
  
      const newRent = new Rent(req.body);
      await newRent.save();
  
      const car_ = await Cars.findById({ _id: req.body.car });
  
      car_.foglaltidoszak.push(req.body.foglaltidoszak);
      await car_.save();
  
      res.send({ msg: 'Az autó bérlésed sikeres volt!' });
    } catch (error) {
      return res.status(400).json(error);
    }
  });

export default rentRouter;