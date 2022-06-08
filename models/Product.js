import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60, // title lengh must be in 60 charectar.
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200, // description lengh must be in 200 charectar.
    },
    img: {
      type: String, // img url will be string.
      required: true,
    },
    prices: {
      type: [Number], // it must be number.
      required: true,
    },
    extraOptions: {
      // these are editional options.
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true } // every model shoud have a timestamps.
);

// if our product already don't have then this will create a new product .
// if our product already have  this will not create a new product.
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
