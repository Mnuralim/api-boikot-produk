import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  qrId: string;
  name: string;
  boycot: boolean;
  imageUrl: string;
  brand: string;
}

const productSchema = new Schema<IProduct>(
  {
    qrId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    boycot: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: "https://i0.wp.com/thealmanian.com/wp-content/uploads/2019/01/product_image_thumbnail_placeholder.png?ssl=1",
    },
    brand: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Products", productSchema);
export default Product;
