const { Region } = require('../models/index');

module.exports = {
    async createRegion(req, res) {
        let data, message;
        const { region_name } = req.body;
        try {
            const [newRegion, created] = await Region.findOrCreate({
                where: { region_name },
                defaults: {
                    region_name
                }
            });
            if (!created) {
                message = "Region already exist";
                data = {}
            } else {
                data = newRegion;
                message = "Create region succes";
            }
            res.json({ data, message })
        } catch (error) {
            console.error(error);
        }
    },
    async uptdateRegion(req,res){
        let data,message;
        const {region_id,region_name}=req.body;
        try {
            const uptdateRegion = await Region.update({
                region_name
            },{where:{region_id}});
            data = uptdateRegion;
            message = "Update region succes";
            res.json({data,message});
        } catch (error) {
            console.error(error);
        }

    },
    async listRegion(req,res){
        let data,message;
        try {
            const listRegion = await Region.findAll();
            data = listRegion;
            message = "List region send success"
            res.json({data,message})
        } catch (error) {
            console.error(error);
        }
    },
    async deleteRegion(req,res){
        const {ref} = req.params;
        try {
            const deleteRegion = await Region.destroy({ where: { region_id: ref } });
            res.json({ data: deleteRegion, message: "Delete region succes" })
        } catch (error) {
            console.error(error);
        }

    },
    async updateRegion(req,res){
        const {ref} = req.params;
        const {region_name} = req.body;
        try {
            const [rowsUpdated,updatedRegion] = await Region.update(
                {
                    region_name
                },
                {
                    where:{region_id:ref},returning:true
                }
            );
            if (rowsUpdated === 0) {
                return res.status(404).json({ message: 'Region not found' });
            }
            res.json({ data: updatedProduct, message: 'Region updated successfully' })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Error on updating the region" });
        }
    }
}