const Product = require('../models/Product');
const { Supplier } = require('../models/index')
    ;
module.exports =
{
    async createProduct(req, res) {

        const { product_ref, product_name, product_description, product_unitprice, product_availableQuantity, supplier_name } = req.body;
        let data, message;
        try {
            const today = new Date().toISOString().split('T')[0];
            const supplier = await Supplier.findOne({
                where: { supplier_name }
            });
            if (!supplier) {
                message = "Supplier not exist,please add supplier in database";
            } else {
                try {
                    const [newProduct, created] = await Product.findOrCreate({
                        where: { product_ref },
                        defaults: {
                            product_ref,
                            product_name,
                            product_description,
                            product_unitprice,
                            product_availableQuantity,
                            product_dateAdded: today
                        }
                    });
                    if (!created) {
                        message = "Product already exists";
                        data = {}
                    } else {
                        data = await newProduct.addSuppliers(supplier);
                        message = "Product created successfully";
                    }
                } catch (error) {
                    console.error(error)
                    return res.status(500).json({ message: "Error creating the product" });
                }
            }
            res.json({ data, message })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Error creating the product" });
        }
    }, async listProduct(req, res) {
        let data, message;
        try {
            const listProduct = await Product.findAll();
            data = listProduct;
            message = "List Product send";
            console.log(message)
        } catch (error) {
            console.error(error);
        }
        res.json({ data, message });

    }, async addProduct(req, res) {
        const { product_ref, quantity } = req.body;
        let data, message;
        try {
            const find = await Product.findOne({
                where: { product_ref }
            });
            if (!find) {
                return res.status(404).json({ message: "Product not found" });
            }
            console.log(find)
            find.product_availableQuantity += quantity;
            await find.save()
            data = find;
            message = "Product quantity increased successfully"
            res.json({ data, message });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Error creating the product" });
        }
    },
    async updateProduct(req, res) {
        const { ref } = req.params;
        const { product_name, product_unitprice } = req.body;
        try {
            const [rowsUpdated, updatedProduct] = await Product.update(
                { product_name, product_unitprice },
                { where: { product_ref: ref }, returning: true });
            if (rowsUpdated === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ data: updatedProduct, message: 'Product updated successfully' })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Error on updating the product" });
        }
    },
    async deleteProduct(req, res) {
        let data, message;
        const { ref } = req.params;
        try {
            const deleteProduct = await Product.destroy({ where: { product_ref: ref } });
            res.json({ data: deleteProduct, message: "Delete product succes" })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Error on updating the product" });
        }

    },
    async getMostRequestedProducts(req, res) {
        let data, message;
        try {
          const topRequestedProducts = await Product.findAll({
            order: [['product_requestedQuantity', 'DESC']],
            limit: 3,
            attributes: ['product_name'],
          });
          data = topRequestedProducts;
          message = "Top requested products sent";
          console.log(message);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Error fetching top requested products" });
        }
        res.json({ data, message });
      },
      async getLowStockProducts(req, res) {
        let data, message;
        try {
          const lowStockProducts = await Product.findAll({
            where: {
              product_availableQuantity: { $lt: 5 } // $lt signifie "moins que"
            },
            attributes: ['product_name'],
          });
          data = lowStockProducts;
          message = "Low stock products sent";
          console.log(message);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Error fetching low stock products" });
        }
        res.json({ data, message });
      },
      async getLowStockProductCount(req, res) {
        try {
          const lowStockProductCount = await Product.count({
            where: {
              product_availableQuantity: { $lt: 5 }
            },
          });
          const message = `There are ${lowStockProductCount} products with low stock`;
          console.log(message);
          res.json({ count: lowStockProductCount, message });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Error fetching low stock product count" });
        }
      },
      async getProductStats(req, res) {
        try {
          const totalProductCount = await Product.count();
          const lowStockProductCount = await Product.count({
            where: {
              product_availableQuantity: { $lt: 5 }
            },
          });
          const topRequestedProducts = await Product.findAll({
            order: [['product_requestedQuantity', 'DESC']],
            limit: 3,
            attributes: ['product_name'],
          });
          

      
          const message = `Total products: ${totalProductCount}, Low stock products: ${lowStockProductCount}`;
          console.log(message);
          
          res.json({
            totalProductCount,
            lowStockProductCount,
            topRequestedProducts,

            message
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Error fetching product statistics" });
        }
      }


}