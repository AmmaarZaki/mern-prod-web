import { create } from "zustand";

export const useProductStore = create((set) => ({

    products: [],
    setProduct: (products) => set({ products }),

    createProduct: async (newProduct) => {

        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {
                success: false,
                message: "Please fill all the product info."
            }
        }

        try {
            const response = await fetch("/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });

            const data = await response.json();

            set((state) => ({ products: [...state.products, data.data] }));

            return {
                success: true,
                message: "Product created."
            }

        } catch (error) {

            console.error(`Failed to create product: ${error.message}`);
            return {
                success: false,
                message: `Error creating product: ${error.message}`
            }
        }
    },

    getAllProducts: async () => {
        try {
            const response = await fetch("/api/products");

            const data = await response.json();

            set({ products: data.data });

            return {
                success: true,
                message: "Get all products success."
            }

        } catch (error) {

            console.error(`Failed to get all products: ${error.message}`);
            return {
                success: false,
                message: `Error to get all products: ${error.message}`
            }
        }
    },

    deleteProduct: async (productId) => {

        try {
            const response = await fetch(`/api/product/${productId}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!data.success) {
                return {
                    success: false,
                    message: data.message
                }
            }

            set(state => ({
                products: state.products.filter(x => x._id !== productId)
            }));

            return {
                success: true,
                message: `Product deleted.`
            }

        } catch (error) {

            console.log(`Failed to delete product: ${error.message}`);
            return {
                success: false,
                message: `Error deleting product: ${error.message}`
            }
        }
    },

    updateProduct: async (productId, updateProduct) => {

        try {
            const response = await fetch(`/api/product/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateProduct)
            });

            const data = await response.json();

            if (!data.success) {
                return {
                    success: false,
                    message: data.message
                }
            }

            set((state) => ({
                products: state.products.map((product) => (product._id === productId ? data.data : product))
            }));

            return {
                success: true,
                message: "Product updated."
            }

        } catch (error) {
            console.log(`Failed updating product: ${error.message}`)
            return {
                success: false,
                message: `Error updating product: ${error.message}`
            }
        }
    }
}));