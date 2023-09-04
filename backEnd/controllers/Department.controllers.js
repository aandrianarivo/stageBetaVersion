const Located = require("../models/Located");
const { Department, Region } = require("../models/index");

module.exports = {
  async createDepartment(req, res) {
    const { department_name, admin_id, region_name } = req.body;
    let data, message;
    try {
      const findRegion = await Region.findOne({ where: { region_name } });
      if (findRegion) {
        try {
          const [newDepartement, created] = await Department.findOrCreate({
            where: { department_name },
            defaults: {
              department_name,
              admin_id,
            },
          });
          if (!created) {
            data = {};
            message = "Department is already exist";
          } else {
            try {
              const final = await Located.create({
                department_id: newDepartement.department_id,
                region_id: findRegion.region_id,
              });
              data = final;
              message = "Departmemt create succes";
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        message =
          "Region not Found,please enter region in database before add Department";
      }

      res.json({ data, message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error on creating Departement" });
    }
  },
  async listDepartment(req, res) {
    let data, message;
    try {
      const findDepartement = await Department.findAll();
      data = findDepartement;
      message = "List of Department";
      res.json({ data, message });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error on sending List of departement" });
    }
  },
  async updateDepartment(req, res) {
    let data, message;
    const { department_id, department_name } = req.body;
    try {
      const find = await Department.findByPk(department_id);
      if (find) {
        const updateDepartment = await Department.update(
          {
            department_name,
          },
          { where: { department_id } }
        );
        if (updateDepartment) {
          data = updateDepartment;
          message = "Update departement succes";
        } else {
          data = {};
          message = "Error on update department";
        }
      }
      res.json({ data, message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error on update department" });
    }
  },
  async deleteDepartment(req, res) {
    let data, message;
    const { department_id } = req.body;
    try {
      const deleteDepartment = await Department.delete({
        where: { department_id },
      });
      data = deleteDepartment;
      message = "Delete departement succes";
      res.json({ data, message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error on delete department" });
    }
  },
  async getDepartmentStat(req, res) {
    try {
      const departlist = await Department.findAll({
        attributes: ["department_name"],
      });
      res.json({
        data:{
            departlist,},
        message:"sucess"
      });
    } catch (error) {
        console.error(error)
    }
  },
};
