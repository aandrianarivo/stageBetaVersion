const sequelize = require("./__sequelize");
const TeamLeader = require('./TeamLeader');
const User = require('./User');
const Product = require('./Product');
const Request = require("./Request");
const Contain = require("./Contain");
const Supplier = require("./Supplier");
const Provid = require("./Provid");
const Admin = require("./Admin");
const Contact = require("./Contact");
const Department = require("./Department");
const Region = require("./Region");
const Located = require("./Located");







User.hasMany(Request, { foreignKey: "user_id" });
Request.belongsTo(User, { foreignKey: "user_id" });


Request.belongsToMany(Product, { through: Contain, foreignKey: 'request_id' });
Product.belongsToMany(Request, { through: Contain, foreignKey: 'product_ref' });


Product.belongsToMany(Supplier, { through: Provid, foreignKey: 'product_ref' });
Supplier.belongsToMany(Product, { through: Provid, foreignKey: 'supplier_id' });


Supplier.belongsToMany(Admin, { through: Contact, as: 'AdminSupplier', foreignKey: 'supplier_id' });
Admin.belongsToMany(Supplier, { through: Contact, as: 'AdminSupplier', foreignKey: 'admin_id' });

Admin.hasMany(User, { foreignKey: "admin_id" });
User.belongsTo(Admin, { foreignKey: "admin_id" });

Department.hasMany(User, { foreignKey: "department_id" });
User.belongsTo(Department, { foreignKey: "department_id" });

Department.hasOne(TeamLeader,{foreignKey: 'department_id'});
TeamLeader.belongsTo(Department,{foreignKey: 'department_id'});

TeamLeader.hasMany(Request, { foreignKey: "teamLeader_id" });
Request.belongsTo(TeamLeader, { foreignKey: "teamLeader_id" });

Department.belongsToMany(Region, { through: Located, as: 'DepartmentRegion', foreignKey: 'department_id' });
Region.belongsToMany(Department, { through: Located, as: 'DepartmentRegion', foreignKey: 'region_id' });

Admin.hasMany(Department, { foreignKey: "admin_id" });
Department.belongsTo(Admin, { foreignKey: "admin_id" });


exports.sequelize = sequelize;
exports.TeamLeader = TeamLeader;
exports.Product = Product;
exports.User = User;
exports.Request = Request;
exports.Contain= Contain;
exports.Supplier=Supplier;
exports.Department=Department;
exports.Region = Region;
exports.Contact = Contact;


