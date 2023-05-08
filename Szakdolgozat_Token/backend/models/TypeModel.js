import mongoose from "mongoose";

//tábla készítés a típusoknak
const typeSchema = new mongoose.Schema(
    {
        gyarto: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model('Category', typeSchema);
export default Category;