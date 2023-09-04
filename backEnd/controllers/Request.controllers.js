const { TeamLeader, Contain, Product } = require("../models");
const Request = require("../models/Request");
const sequelize = require("../models/__sequelize");

module.exports = {
  async createRequest(req, res) {
    let data, message;
    const { teamLeader_name, user_id, request_productName, request_quantity } =
      req.body;
    try {
      const today = new Date().toISOString().split("T")[0];

      const findTeamLeader = await TeamLeader.findOne({
        where: { teamLeader_name },
      });
      if (!findTeamLeader) {
        return res.status(404).json({ message: "Team not found" });
      }
      const teamLeader_id = parseInt(findTeamLeader.teamLeader_id);
      const newRequest = await Request.create({
        teamLeader_id: teamLeader_id,
        user_id: user_id,
        request_productName: request_productName,
        request_quantity: request_quantity,
        request_date: today,
      });

      const findproduct = await Product.findOne({
        where: { product_name: request_productName },
      });
      if (findproduct) {
        await Contain.create({
          request_id: newRequest.request_id,
          product_ref: findproduct.product_ref,
        });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
      data = newRequest;
      message = "Create new request success";
      res.json({ data, message });
    } catch (error) {
      console.error(error);
    }
  },
  async listRequest(req, res) {
    let data, message;
    try {
      const listRequest = await Request.findAll();
      data = listRequest;
      message = "List request send";
    } catch (error) {
      console.error(error);
    }
    res.json({ data, message });
  },
  async findReqByTL(req, res) {
    const {ref} = req.params;
    try {
      const find = await Request.findAll({ where: { teamLeader_id :ref} });
      if (find) {
        const sortedData = find.sort((a, b) => new Date(b.date) - new Date(a.date));
        data = sortedData;
        message = "Request load succes";
      } else {
        data = {};
        message = "Request load fail";
      }

      res.json({ data, message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error send team leader request" });
    }
  },
  async validRequestbyTL(req, res) {
    const { teamLeader_id, valid, request_id } = req.body;
    let message, data;

    try {
      const find = await Request.findOne({
        where: { teamLeader_id, request_id },
      });

      if (find) {
        find.request_validTeamLeader = valid;
        console.log("user found", find.request_validTeamLeader);
        try {
          await find.save();
          await find.reload();
          console.log("save succes");
        } catch (e) {
          console.error(e);
        }

        message = "Validation successful";
        data = find;
        console.log(data.request_validTeamLeader);
        res.json({ message, data });
      } else {
        message = "Request not found";
        res.json({ message, data: {} });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error validating Request by TeamLead" });
    }
  },
  async validRequestbyAdmin(req, res) {
    const { request_id, request_Status } = req.body;
    let data, message, transaction;
    const today = new Date().toISOString().split("T")[0];

    try {
      transaction = await sequelize.transaction();
      const find = await Request.findOne({
        where: { request_id },
      });
      if (find && find.request_validTeamLeader === true) {
        const quantity = find.request_quantity;
        console.log("QuantityRequested", quantity);
        const uptatedRequest = await Request.update(
          { request_Status, request_proccesDate: today },
          { where: { request_id }, transaction }
        );

        const contains = await Contain.findOne({ where: { request_id } });
        const product_ref = contains.product_ref;

        const updateProduct = await Product.decrement(
          "product_availableQuantity",
          { by: quantity, where: { product_ref }, transaction }
        );
        // const increment = await Product.increment(
        //     'product_requestedQuantity',{by:quantity, where: {product_ref }, transaction }
        // );
        const theProduct = await Product.findOne({ where: { product_ref } });
        theProduct
          ? (theProduct.product_requestedQuantity += quantity)
          : console.log("Error");
        console.log(
          "Requested quantity after Admin validation",
          theProduct.product_requestedQuantity
        );

        await transaction.commit();

        data = { updateProduct, uptatedRequest, theProduct };
        message = "Validation by Admin succes";
      } else {
        console.error(find);
        return res
          .status(500)
          .json({ message: "This request need Team Leader validation" });
      }

      res.json({ data, message });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error validating Request by Admin" });
    }
  },
  async updateRequest(req, res) {
    const { request_id, request_quantity, request_productName } = req.body;
    let data, message;
    try {
      const update = await Request.update(
        { request_quantity, request_productName },
        { where: { request_id } }
      );
      if (update) {
        data = update;
        message = "Update req succes";
        res.json({ data, message });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error on update request" });
    }
  },
  async reqListVadidateByTL(req, res) {
    let data, message;
    try {
      const find = await Request.findAll({
        where: { request_validTeamLeader: true ,request_Status:"IN PROGRESS"},
      });
      data = find;
      message = "Send request list validate by Team leader";
      res.json({ data, message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error on sending request list validate by Team leader",
      });
    }
  },
  async reqListVadidateByAdmin(req, res) {
    let data, message;
    try {
      const find = await Request.findAll({ where: { request_Status: "DONE" } });
      data = find;
      message = "Send request list validate by ADMIN";
      res.json({ data, message });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error on sending request list validate by ADMIN" });
    }
  },
  async getRequest(req, res) {
    const { ref } = req.params;
    try {
      const request = await Request.findAll({ where: { user_id: ref } });
      res.json({ data :request, message:"List message send succesfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error on sending request list validate by ADMIN" });
    }
  },
  async getRequestsInProgressCount(req, res) {
    try {
      const count = await Request.count({
        where: { request_Status: "IN PROGRESS" },
      });
      const message = `There are ${count} requests with status IN PROGRESS`;
      console.log(message);
      res.json({ count, message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching in-progress request count" });
    }
  },

  async getRequestsInProgress(req, res) {
    try {
      const inProgressRequests = await Request.findAll({
        attributes: ['request_id', 'request_productName'],
        where: { request_Status: "IN PROGRESS" },
      });
      const message = "List of requests with status IN PROGRESS";
      console.log(message);
      res.json({ data: inProgressRequests, message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching in-progress requests" });
    }
  },
};
