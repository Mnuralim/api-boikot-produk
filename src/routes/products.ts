import express from "express";
import { addProduct, findByQrId, getAllProduct, updateProducts } from "../controllers/product";

const router = express.Router();

router.get("/", getAllProduct);
router.patch("/", updateProducts);
router.post("/", addProduct);
router.get("/:qrid", findByQrId);

const ProductRouter = router;

export default ProductRouter;
