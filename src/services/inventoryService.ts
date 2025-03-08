import Product from "../model/product";
import Inventory from "../model/Inventory";
import StockIn from "../model/StockIn";
import StockOut from "../model/StockOut";
import redisClient from "../utils/redis";
import { notifyStockUpdate } from "../utils/socket";

export const getStock = async (product_id: number): Promise<number> => {
    const cachedStock = await redisClient.get(`stock:${product_id}`);
    if (cachedStock !== null) return parseInt(cachedStock);

    const inventory = await Inventory.findOne({ where: { product_id } });
    const quantity = inventory?.quantity || 0;
    await redisClient.setEx(`stock:${product_id}`, 3600, quantity.toString());
    return quantity;
};

export const stockIn = async (product_id: number, quantity: number, supplier?: string) => {
    const product = await Product.findByPk(product_id);
    if (!product) throw new Error("Sản phẩm không tồn tại");

    await StockIn.create({ product_id, quantity, supplier });
    const currentStock = await getStock(product_id);
    await Inventory.upsert({ product_id, quantity: currentStock + quantity });
    await Product.update({ stock: product.stock + quantity }, { where: { id: product_id } });

    const newStock = currentStock + quantity;
    await redisClient.setEx(`stock:${product_id}`, 3600, newStock.toString());
    notifyStockUpdate(product_id, newStock);
};

export const stockOut = async (product_id: number, quantity: number, reason?: string) => {
    const product = await Product.findByPk(product_id);
    if (!product) throw new Error("Sản phẩm không tồn tại");

    const currentStock = await getStock(product_id);
    if (currentStock < quantity) throw new Error("Không đủ hàng trong kho");

    await StockOut.create({ product_id, quantity, reason });
    await Inventory.update({ quantity: currentStock - quantity }, { where: { product_id } });
    await Product.update({ stock: product.stock - quantity }, { where: { id: product_id } });

    const newStock = currentStock - quantity;
    await redisClient.setEx(`stock:${product_id}`, 3600, newStock.toString());
    notifyStockUpdate(product_id, newStock);
};

export const checkout = async (product_id: number, quantity: number) => {
    const currentStock = await getStock(product_id);
    if (currentStock < quantity) throw new Error("Hết hàng");

    await stockOut(product_id, quantity, "Bán hàng");
};