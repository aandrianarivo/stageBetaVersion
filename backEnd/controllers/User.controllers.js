const Admin = require('../models/Admin');
const { User, Department, Supplier, TeamLeader } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports =
{
    async loginUser(req, res) {
        const { login_email, login_password } = req.body;
        let message, token;

        console.log(login_email,login_password);


        try {
            let isAuthenticated = false;

            // Rechercher l'utilisateur par email
            const user = await User.findOne({
                where: { user_email: login_email }
            });

            // Vérifier le mot de passe de l'utilisateur s'il existe
            if (user) {
                const isMatch = await bcrypt.compare(login_password, user.user_password);
                if (isMatch) {
                    const paylod = {
                        role:"user",
                        id: user.user_id,
                        name: user.user_name
                    }
                    token = jwt.sign(paylod, "secret-key");
                    message = "Authentication successful as User";
                    isAuthenticated = true;
                    return res.json({ token, message })
                }
            }

            // Si l'utilisateur n'a pas été authentifié, vérifier l'administrateur
            if (!isAuthenticated) {
                const admin = await Admin.findOne({ where: { admin_email: login_email } });
                if (admin) {
                    const isMatch = await bcrypt.compare(login_password, admin.admin_password);
                    if (isMatch) {
                        const paylod = {
                            role:"admin",
                            id: admin.admin_id,
                            name: admin.admin_name
                        }
                        token = jwt.sign(paylod, "secret-key");
                        message = "Authentication successful as Admin";
                        isAuthenticated = true;
                        return res.json({ token, message })
                    }
                }
            }
            if (!isAuthenticated) {
                const teamLeader = await TeamLeader.findOne({ where: { teamLeader_email: login_email } });
                if (teamLeader) {
                    const isMatch = await bcrypt.compare(login_password, teamLeader.teamLeader_password);
                    if (isMatch) {
                        const paylod = {
                            role:"tl",
                            id: teamLeader.teamLeader_id,
                            name: teamLeader.teamLeader_name
                        }
                        token = jwt.sign(paylod, "secret-key");
                        message = "Authentication successful as TeamLeader";
                        isAuthenticated = true;
                        return res.json({ token, message })
                    }
                }
            }

            // Si l'authentification a échoué
            if (!isAuthenticated) {
                message = "Authentication failed";
                res.json({ message });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error during authentication" });
        }
    }

    , async createUser(req, res) {
        let data, message;

        const { user_name, user_password, user_email, admin_id, department_name } = req.body;
        try {
            const findDepartment = await Department.findOne({
                where: { department_name }
            });
            if (findDepartment) {
                const getId = findDepartment.department_id;
                const hashedPassword = await bcrypt.hash(user_password, 10);
                const newUser = await User.create({
                    admin_id,
                    department_id: getId,
                    user_name,
                    user_password: hashedPassword,
                    user_email
                });
                data = newUser;
                message = "User create succes"
            } else {
                message = "Department not found";
            }

            res.json({ data, message })
        } catch (error) {
            console.error(error)
        }

    },
    async listUser(req, res) {
        try {
            const listUser = await User.findAll();
            let data = listUser;
            res.json(data);
        } catch (error) {
            console.error(error);
        }
    },
    async updateUser(req, res) {
        const { user_id, user_name, user_password, user_email, admin_id, department_name } = req.body;
        let data, message;
        try {
            const findDep = await Department.findOne({
                where: { department_name }
            });
            const getId = findDep.department_id;
            const hash = await bcrypt.hash(user_password, 10);
            const update = await User.update({
                user_name,
                user_name,
                user_password: hash,
                user_email,
                admin_id,
                department_id: getId
            }, { where: { user_id } });
            data = update;
            message = "Update user succes";
            res.json({ data, message });
        } catch (error) {
            console.error(error);
        }
    },
    async deleteUser(req, res) {
        const { user_id } = req.body;
        let data, message;
        try {
            const deleteUser = await User.delete({
                where: { user_id }
            });
            data = deleteUser;
            message = "Delete user succes"

            res.json({ data, message });
        } catch (error) {
            console.error(error)
        }

    }

}