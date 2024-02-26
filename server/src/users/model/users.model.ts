import sqlite3 from 'sqlite3';

import { IGetUser } from '../../Models/GetUsers';
import { ICreateUser, IUpdateUser, IUser } from '../../Models/User';
class User {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database('./db/db');
    }
    create(user: ICreateUser, callback: (err: Error | null, user?: IUser) => void) {
        console.log(user);
        this.db.run(
            'INSERT INTO users (email, password, registrationDate) VALUES (?, ?, ?)',
            [user.email, user.password, user.registrationDate],
            function (err) {
                if (err) {
                    callback(err);
                    return;
                } else {
                    callback(null, {
                        userId: this.lastID,
                        email: user.email,
                        password: user.password,
                        registrationDate: user.registrationDate,
                    });
                }
            },
        );
    }
    getAll(callback: (err: Error | null, rows: IGetUser[]) => void) {
        this.db.all('SELECT u.*, r.RoleName AS roleName FROM users u LEFT JOIN roles r ON u.Role = r.RoleID', callback);
    }
    delete(id: number, callback: (err: Error | null) => void) {
        this.db.run('DELETE FROM users WHERE UserID = ?', [id], callback);
    }
    update(id: number, user: IUpdateUser, callback: (err: Error | null) => void) {
        this.db.run(
            'UPDATE users SET FirstName = ?, LastName = ?, Email = ?, Password = ?, Role = ? WHERE UserID = ?',
            [user.firstName, user.lastName, user.email, user.password, user.role, id],
            callback,
        );
    }
    getUserByEmail(email: string, callback: (err: Error | null, user: IUser) => void) {
        this.db.get('SELECT * FROM Users WHERE Email = ?', [email], callback);
    }
    getUserById(userId: string, callback: (err: Error | null, user: IUser) => void) {
        this.db.get('SELECT * FROM Users WHERE userId = ?', [userId], callback);
    }
    saveToken(token: string, userID: number) {
        this.db.run('UPDATE Users SET refreshToken = ? WHERE userID = ? ', [token, userID]);
    }
    findToken(token: string, callback: (err: Error | null, user: { userId: number; refreshToken: string }) => void) {
        this.db.get('SELECT userId, refreshToken FROM Users WHERE refreshToken = ?', [token], callback);
    }
}

export default User;
