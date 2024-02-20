import argon2 from 'argon2';
import { Request, Response } from 'express';

import User from '../model/users.model';
import { getRoleIdByRoleName } from '../service/roleService';
class UserController {
    static async listUsers(req: Request, res: Response) {
        const userModel = new User();
        userModel.getAll((err, users) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(users);
        });
    }

    static async createUser(req: Request, res: Response) {
        const { firstName, lastName, email, password, roleName } = req.body;
        const userModel = new User();
        const hashedPassword = await argon2.hash(password);
        const role = getRoleIdByRoleName(roleName);
        const isoDateString = new Date().toISOString().split('T')[0];

        userModel.create(
            { firstName, lastName, email, password: hashedPassword, registrationDate: isoDateString, role },
            (err) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.send('User created successfully');
            },
        );
    }

    static async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { firstName, lastName, email, password, roleName } = req.body;
        const userModel = new User();

        const hashedPassword = await argon2.hash(password);
        const role = getRoleIdByRoleName(roleName);

        userModel.update(
            parseInt(id),
            { firstName, lastName, email, password: hashedPassword, registrationDate: new Date().toISOString(), role },
            (err) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.send('User updated successfully');
            },
        );
    }

    static async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const userModel = new User();
        userModel.delete(parseInt(id), (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.send('User deleted successfully');
        });
    }
}

export default UserController;
