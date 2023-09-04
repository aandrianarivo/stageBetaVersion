const Admin = require("../models/Admin");
const bcrypt = require('bcrypt');

module.exports = {
    async createAdmin(req, res) {
        const { admin_name, admin_password, admin_email } = req.body;
        let data, msg ;
        try {
            const hash = bcrypt.hash(admin_password,10);
            const newAdmin = await Admin.create({
                admin_name,
                admin_password:hash,
                admin_email
            })
            msg = "Admin create succes"
            data = newAdmin;

            res.json({ data, msg })
        } catch (error) {
            console.error(error);
        }

    },
    async updateAdmin(req,res){
        const {admin_id,admin_name,admin_password,admin_email} = req.body;
        let data,message;
        try {
            const hash = await bcrypt.hash(admin_password,10);
            const update = await Admin.update(
                {
                    admin_name,
                    admin_email,
                    admin_password:hash
                },{where:{admin_id}}
            );
            if(update){
                data = update;
                message = "Update admin succes";
            }
            res.json({data,message});
        } catch (error) {
            console.error(error);
            
        }
    }
}