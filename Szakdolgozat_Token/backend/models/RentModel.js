import mongoose from 'mongoose'
//Tábla készítés a bérlőknek


const rentSchema = new mongoose.Schema({

    car: {type: mongoose.Schema.Types.ObjectId, ref: 'cars'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    foglaltidoszak: {
        from: {type: String},
        to: {type: String}
    },
    totalDays: {type: Number},
    total: {type: Number}

}, {
    timestamps: true


})


const Rent = mongoose.model('Rent', rentSchema);
export default Rent;