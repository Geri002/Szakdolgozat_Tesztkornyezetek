import mongoose from 'mongoose'
//Tábla készítés az autóknak


const carsSchema = new mongoose.Schema({

    id: {type: Number, required: true},
    kep: {type: String, required: true},
    gyarto: {type: String, required: true},
    model: {type: String, required: true},
    osszeg_per_nap: {type: Number, required: true},
    uzemanyag: {type: String, required: true},
    foglaltidoszak: [
        {
            from: {type: String, required: true},
            to: {type: String, required: true}
        }
    ],
    szallithato_szemelyek_szama: {type: Number, required: true}

}, {
    timestamps: true


})


const Cars = mongoose.model('Cars', carsSchema);
export default Cars;