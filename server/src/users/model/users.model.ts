import sqlite3 from 'sqlite3';

import { IGetUser } from '../../Models/GetUsers';
import { IUser } from '../../Models/User';
class User {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database('./db/db');
    }
    public create(user: IUser, callback: (err: Error | null) => void) {
        console.log(user);
        this.db.run(
            'INSERT INTO users (FirstName, LastName, Email, Password, RegistrationDate, Role) VALUES (?, ?, ?, ?, ?, ?)',
            [user.firstName, user.lastName, user.email, user.password, user.registrationDate, user.role],
            callback,
        );
    }
    public getAll(callback: (err: Error | null, rows: IGetUser[]) => void) {
        this.db.all('SELECT u.*, r.RoleName AS roleName FROM users u LEFT JOIN roles r ON u.Role = r.RoleID', callback);
    }
    public delete(id: number, callback: (err: Error | null) => void) {
        this.db.run('DELETE FROM users WHERE UserID = ?', [id], callback);
    }
    public update(id: number, user: IUser, callback: (err: Error | null) => void) {
        this.db.run(
            'UPDATE users SET FirstName = ?, LastName = ?, Email = ?, Password = ?, Role = ? WHERE UserID = ?',
            [user.firstName, user.lastName, user.email, user.password, user.role, id],
            callback,
        );
    }
    getUserByEmail(email: string, callback: (err: Error | null, user: IUser[]) => void) {
        this.db.all('SELECT * FROM Users WHERE Email = ?', [email], callback);
    }
}

export default User;
