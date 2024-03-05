import sqlite3 from 'sqlite3';

import { IComponent, ICreatePC, IPC } from '../../models/Pc';

class Pc {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database('./db/db');
    }
    async getAllPcAsync(): Promise<IPC[]> {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM Computers', (err, rows: IPC[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    async getPCByIdAsync(computerID: number): Promise<IPC> {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM Computers WHERE ComputerID = ?', [computerID], (err, row: IPC) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
    async getComponentsForPCAsync(computerID: number): Promise<IComponent[]> {
        return new Promise((resolve, reject) => {
            this.db.all(
                'SELECT Computers.ComputerID, ComputerComponents.ComponentID, Components.TypeID, ' +
                    '(SELECT TypeName FROM ComponentTypes WHERE TypeID=Components.TypeID) as TypeName, ' +
                    'Components.DeviceName, Components.Supplier, Components.Country, Components.PurchaseDate, ' +
                    'Components.Description AS ComponentDescription, Components.DeviceInfo ' +
                    'FROM Computers  ' +
                    'LEFT JOIN ComputerComponents ON Computers.ComputerID = ComputerComponents.ComputerID ' +
                    'LEFT JOIN Components ON ComputerComponents.ComponentID = Components.ComponentID ' +
                    'WHERE Computers.ComputerID = ?',
                [computerID],
                (err, rows: IComponent[]) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows.length > 0 ? rows : []);
                    }
                },
            );
        });
    }
    async deleteComponentsForPcAsync(computerID: number): Promise<string> {
        return new Promise((resolve, reject) => {
            this.db.run(
                'DELETE FROM ComputerComponents WHERE ComputerID = ?',
                [computerID],
                (err: Error | null, result: string) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                },
            );
        });
    }
    async deletePCAsync(computerID: number): Promise<string> {
        return new Promise((resolve, reject) => {
            this.db.run(
                'DELETE FROM Computers WHERE ComputerID = ?',
                [computerID],
                (err: Error | null, result: string) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                },
            );
        });
    }
    async createPC(pc: ICreatePC): Promise<ICreatePC> {
        return new Promise((resolve, reject) => {
            this.db.run(
                'INSERT INTO Computers (Model, Description, Condition, LikeCount) VALUES (?, ?, ?, 0)',
                [pc.Model, pc.Description, pc.Condition],
                function (err: Error | null) {
                    if (err) {
                        reject(err);
                    } else {
                        const newId = this.lastID;
                        const newPC: ICreatePC = { ...pc, ComputerID: newId };
                        resolve(newPC);
                    }
                },
            );
        });
    }
    async addComponentsForPC(
        computerID: number,
        componentID: number,
    ): Promise<{ ComputerID: number; ComponentID: number; ComputerComponentID: number }> {
        return new Promise((resolve, reject) => {
            this.db.run(
                'INSERT INTO ComputerComponents (ComputerID, ComponentID) VALUES (?, ?)',
                [computerID, componentID],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        const computerComponentID = this.lastID;
                        const computerComponent = {
                            ComputerID: computerID,
                            ComponentID: componentID,
                            ComputerComponentID: computerComponentID,
                        };
                        resolve(computerComponent);
                    }
                },
            );
        });
    }
}
export default new Pc();
