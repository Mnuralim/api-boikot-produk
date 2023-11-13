"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
router.get("/", product_1.getAllProduct);
router.patch("/", product_1.updateProducts);
router.post("/", product_1.addProduct);
router.get("/:qrid", product_1.findByQrId);
const ProductRouter = router;
exports.default = ProductRouter;
