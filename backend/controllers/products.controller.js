import Product from "../models/product.model.js";

export const createProduct = async (request, response) => {

    const product = request.body;

    if (!product.name || !product.price || !product.image) {

        return response
            .status(400)
            .json({
                success: false,
                message: "Please fill all the product information."
            });
    }

    const newProduct = new Product(product);

    try {

        await newProduct.save();
        return response
            .status(201)
            .json({
                success: true,
                message: "Product created.",
                data: newProduct
            });

    } catch (error) {

        console.log(`Error creating product: ${error}`);
        return response
            .status(500)
            .json({
                success: false,
                message: `Failed to create product: ${error}`
            });
    }
};

export const getAllProducts = async (request, response) => {

    try {
        const products = await Product.find({});
        return response
            .status(200)
            .json({
                success: true,
                data: products
            });

    } catch (error) {
        console.log(`Error to get all products: ${error.message}`);
        return response
            .status(500)
            .json({
                success: false,
                message: `Error to retrieve all products: ${error.message}`
            });
    }
};

export const updateProduct = async (request, response) => {

    const { id } = request.params;
    const product = request.body;

    const productInDB = await Product.findById(id);

    if (!productInDB) {

        return response
            .status(400)
            .json({
                success: false,
                message: `Product not found with id: ${id}`
            });
    };

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productInDB._id, product, { new: true });

        return response
            .status(200)
            .json({
                success: true,
                message: "Product updated.",
                data: updatedProduct
            });

    } catch (error) {
        console.log(`Error updating product: ${error.message}`);

        return response
            .status(500)
            .json({
                success: false,
                message: `Failed updating product: ${error.message}`
            });
    }
};

export const deleteProduct = async (request, response) => {

    const { id } = request.params;

    const product = await Product.findById(id);

    if (!product) {

        return response
            .status(400)
            .json({
                success: false,
                message: `Product not found with id: ${id}`
            });
    }

    try {

        await Product.findByIdAndDelete(product._id);
        return response
            .status(200)
            .json({
                success: true,
                message: `Product with id: ${product._id} has been deleted.`
            });

    } catch (error) {

        console.log(`Error deleting product id: ${product._id}`);
        return response
            .status(500)
            .json({
                success: false,
                message: `Error deleting product: ${error.message}`
            });
    }
};