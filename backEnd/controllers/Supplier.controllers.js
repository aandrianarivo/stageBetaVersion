const { Supplier } = require('../models/index');

module.exports = {
    async createSupplier(req, res) {
        const {  supplier_adrs, supplier_delivryMethod, supplier_paymentMethod } = req.body;
        let data, message;
        try {
            const [newSupplier, created] = await Supplier.findOrCreate({
                where:{supplier_name},
                defaults:{
                    supplier_name,
                    supplier_adrs,
                    supplier_delivryMethod,
                    supplier_paymentMethod
                }
            });
            if (!created) {
                message = "Supplier already exists";
                data = {};
            } else {
                data = newSupplier;
                message = "Supplier created successfully";
            }
            res.json({ data, message });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Error creating supllier" });
        }
    },
    async listSupplier (req,res){
        let data, message;
        try {
            const findSupplier = await Supplier.findAll();
            data = findSupplier;
            message = "List of Suppliers";
            res.json({data,message});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error on sending List of supplier" });
        }
    },
    async updateSupplier(req,res){
        let data,message;
        const {ref} = req.params;
        const{supplier_name,supplier_adrs,supplier_delivryMethod,supplier_paymentMethod}=req.body;
        try {
            const find = await Supplier.findByPk(ref);
            if(find){
                const updateSupplier = await Supplier.update({
                    supplier_name,
                    supplier_adrs,
                    supplier_delivryMethod,
                    supplier_paymentMethod
                },{where:{supplier_id:ref}});
                if(updateSupplier){
                    data = updateSupplier;
                    message = "Update supplier succes";
                }else{
                    data={};
                    message = "Error on update supplier";
                }
            }
            res.json({data,message});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error on update supplier" });
        }
    },
    async deleteSupplier(req,res){
        let data,message;
        const {ref}=req.params;
        try {
            const deleteSupplier = await Supplier.delete({where:{supplier_id:ref}});
            data = deleteSupplier;
            message = "Delete supplier succes";
            res.json({data,message})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error on delete supplier" });
        }

    }
}