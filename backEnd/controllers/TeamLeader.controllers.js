const { where } = require("sequelize");
const TeamLeader = require("../models/TeamLeader");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = {
  async createTeamLeader(req, res) {
    let data, message;
    const { teamLeader_name, teamLeader_email, teamLeader_password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(teamLeader_password, 10);
      const newTeamLeader = await TeamLeader.create({
        teamLeader_name,
        teamLeader_email,
        teamLeader_password: hashedPassword,
      });
      data = newTeamLeader;
      message = "Creating new team leader succes";
    } catch (error) {
      console.error(error);
    }
    res.json({ data, message });
  },
  async listTeamLeader(req, res) {
    let data, message;
    try {
      const listTeamLeader = await TeamLeader.findAll();
      data = listTeamLeader;
      message = "List team leader send";
      console.log(message);
    } catch (error) {
      console.error(error);
    }
    res.json({ data, message });
  },
  async updateTeamLeader(req, res) {
    const { ref } = req.params;
    const { teamLeader_name, teamLeader_email, department_id } = req.body;
    try {
      const find = await TeamLeader.findOne({ where: { teamLeader_id: ref } });
      if (find) {
        try {
            find.set({
                teamLeader_name:teamLeader_name,
                teamLeader_email:teamLeader_email,
                department_id:department_id
            })
            await find.save();
          res.json({data:find,message:"Team leader maj succes"})
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
  async getUsers (req,res){
    const {ref} = req.params;
    try {
      const findTl = await TeamLeader.findOne({where:{teamLeader_id:ref}});
      if(findTl){
        try {
          const users = await User.findAll({where:{department_id:findTl.department_id}});
          res.json({data:users,message:"send all users in team leader"}); 
        } catch (error) {
          console.error(error)
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};
