import { Request, Response, NextFunction } from "express";
import Product from "../models/products";
import ApiError from "../utils/apiError";

export const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name, boycot, page, limit } = req.query;

  try {
    const filterData = {} as { name: any; boycot: boolean };

    if (name) {
      filterData.name = { $regex: ".*" + name + ".*", $options: "i" };
    }

    if (boycot && boycot === "true") {
      filterData.boycot = true;
    } else if (boycot && boycot === "false") {
      filterData.boycot = false;
    }

    const skip = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10) || 0;

    const products = await Product.find(filterData)
      .sort("name")
      .skip(skip)
      .limit(parseInt(limit as string, 10));

    res.status(200).json({
      success: true,
      data: {
        page: parseInt(page as string, 10),
        length: products.length,
        products,
      },
    });
  } catch (error: any) {
    next(new ApiError(error.message, 500));
  }
};

export const updateProducts = async (req: Request, res: Response, next: NextFunction) => {
  const { name, imageUrl } = req.query;

  try {
    const filterData = {} as { name: any };
    if (name) {
      filterData.name = { $regex: ".*" + name + ".*", $options: "i" };
    }
    await Product.updateMany(filterData, {
      // boycot: true,
      imageUrl,
    });

    res.status(200).json({
      success: true,
      message: "Updated data success",
    });
  } catch (error: any) {
    next(new ApiError(error.message, 500));
  }
};

export const findByQrId = async (req: Request, res: Response, next: NextFunction) => {
  const { qrid } = req.params;
  try {
    const product = await Product.findOne({
      qrId: qrid,
    });

    if (!product) return next(new ApiError("Produk ini tidak masuk dalam daftar boikot", 404));

    res.status(200).json({
      success: true,
      data: {
        product,
      },
    });
  } catch (error: any) {
    next(new ApiError(error.message, 500));
  }
};

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { qrid, name, imageUrl, brand } = req.body;
  console.log({ qrid, name, imageUrl, brand });

  try {
    const product = await Product.findOne({ qrId: qrid });
    if (product) return next(new ApiError("Produk sudah ditambahkan sebelumnya", 400));

    await Product.create({
      qrId: qrid,
      name,
      imageUrl,
      brand,
    });

    res.status(200).json({
      success: true,
      message: "Sukses menambahkan produk",
    });
  } catch (error: any) {
    next(new ApiError(error.message, 500));
  }
};
