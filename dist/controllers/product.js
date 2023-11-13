"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.findByQrId = exports.updateProducts = exports.getAllProduct = void 0;
const products_1 = __importDefault(require("../models/products"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const getAllProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, boycot, page, limit } = req.query;
    try {
        const filterData = {};
        if (name) {
            filterData.name = { $regex: ".*" + name + ".*", $options: "i" };
        }
        if (boycot && boycot === "true") {
            filterData.boycot = true;
        }
        else if (boycot && boycot === "false") {
            filterData.boycot = false;
        }
        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10) || 0;
        const products = yield products_1.default.find(filterData)
            .sort("name")
            .skip(skip)
            .limit(parseInt(limit, 10));
        res.status(200).json({
            success: true,
            data: {
                page: parseInt(page, 10),
                length: products.length,
                products,
            },
        });
    }
    catch (error) {
        next(new apiError_1.default(error.message, 500));
    }
});
exports.getAllProduct = getAllProduct;
const updateProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const filterData = {};
        if (name) {
            filterData.name = { $regex: ".*" + name + ".*", $options: "i" };
        }
        yield products_1.default.updateMany(filterData, {
            boycot: true,
        });
        res.status(200).json({
            success: true,
            message: "Updated data success",
        });
    }
    catch (error) {
        next(new apiError_1.default(error.message, 500));
    }
});
exports.updateProducts = updateProducts;
const findByQrId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { qrid } = req.params;
    try {
        const product = yield products_1.default.findOne({
            qrId: qrid,
        });
        if (!product)
            return next(new apiError_1.default("Produk ini tidak masuk dalam daftar boikot", 404));
        res.status(200).json({
            success: true,
            data: {
                product,
            },
        });
    }
    catch (error) {
        next(new apiError_1.default(error.message, 500));
    }
});
exports.findByQrId = findByQrId;
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { qrid, name, imageUrl } = req.body;
    try {
        const product = yield products_1.default.findOne({ qrId: qrid });
        if (product)
            return next(new apiError_1.default("Produk sudah ditambahkan sebelumnya", 400));
        yield products_1.default.create({
            qrId: qrid,
            name,
            imageUrl,
        });
        res.status(200).json({
            success: true,
            message: "Sukses menambahkan produk",
        });
    }
    catch (error) {
        next(new apiError_1.default(error.message, 500));
    }
});
exports.addProduct = addProduct;
