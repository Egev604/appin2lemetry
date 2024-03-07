import { IComponent, ICreatePC, IPC } from '../../models/Pc';
import pcModel from '../model/pc.model';

class PcService {
    async getAllPcAsync(): Promise<IPC[]> {
        return await pcModel.getAllPcAsync();
    }
    async getComponentsForPCAsync(computerID: number): Promise<IComponent[]> {
        return pcModel.getComponentsForPCAsync(computerID);
    }
    async deletePCAsync(computerID: number): Promise<string> {
        return pcModel.deletePCAsync(computerID);
    }
    async deleteAllComponentsForPC(computerID: number): Promise<string> {
        return pcModel.deleteAllComponentsForPcAsync(computerID);
    }
    async createPc(pc: ICreatePC): Promise<ICreatePC> {
        return pcModel.createPC(pc);
    }
    async getPCByIdAsync(computerID: number): Promise<IPC> {
        return await pcModel.getPCByIdAsync(computerID);
    }
    async addComponentsForPC(
        pc: ICreatePC | IPC,
    ): Promise<{ ComputerID: number; ComponentID: number; ComputerComponentID: number }[]> {
        const promises: Promise<{ ComputerID: number; ComponentID: number; ComputerComponentID: number }>[] = [];
        if (pc.components) {
            for (const key of Object.keys(pc.components)) {
                const component = pc.components[key as keyof typeof pc.components];
                if (component && pc.ComputerID) {
                    promises.push(pcModel.addComponentsForPC(pc.ComputerID, Number(component.ComponentID)));
                }
            }
        }
        return Promise.all(promises);
    }
    async getAllPcsWithComponents(): Promise<IPC[]> {
        const listPC = await this.getAllPcAsync();
        for (const pc of listPC) {
            pc.components = await this.getComponentsForPC(pc.ComputerID);
        }
        return listPC;
    }
    async getPcByIdWithComponents(computerID: number): Promise<IPC> {
        const pc = await this.getPCByIdAsync(computerID);
        pc.components = await this.getComponentsForPC(computerID);
        return pc;
    }
    async getComponentsForPC(computerID: number): Promise<{ [key: string]: IComponent }> {
        const componentsForPc = await this.getComponentsForPCAsync(computerID);
        if (componentsForPc[0].ComponentID === null) {
            return {};
        }
        const components: { [key: string]: IComponent } = {};
        for (const component of componentsForPc) {
            const componentName = getComponentName(component.TypeID);
            components[componentName] = component;
        }

        return components;
    }
    async updatePC(updatedPC: IPC): Promise<IPC> {
        const componentsForPc = await this.getComponentsForPCAsync(updatedPC.ComputerID);
        const newComponents: IComponent[] = [];
        if (updatedPC.components) {
            for (const newComponent of Object.values(updatedPC.components)) {
                const existingComponent = componentsForPc.find((comp) => comp.ComponentID === newComponent.ComponentID);

                if (!existingComponent) {
                    newComponents.push(newComponent);
                }
            }
        }

        const componentsToDelete = componentsForPc.filter((existingComponent: IComponent) =>
            Object.values(updatedPC.components || {}).some(
                (newComponent: IComponent) => newComponent.TypeID === existingComponent.TypeID,
            ),
        );
        if (componentsToDelete) {
            for (const componentToDelete of componentsToDelete) {
                await pcModel.deleteComponentForPcAsync(updatedPC.ComputerID, Number(componentToDelete.ComponentID));
            }
            if (newComponents.length > 0) {
                console.log(updatedPC);
                await this.addComponentsForPC(updatedPC);
            }
        }
        let query = 'UPDATE Computers SET ';
        const params = [];
        if (updatedPC.Model) {
            query += 'Model = ?, ';
            params.push(updatedPC.Model);
        }
        if (updatedPC.Description) {
            query += 'Description = ?, ';
            params.push(updatedPC.Description);
        }
        if (updatedPC.Condition) {
            query += 'Condition = ?, ';
            params.push(updatedPC.Condition);
        }
        query = query.slice(0, -2) + ' WHERE ComputerID = ?';
        params.push(updatedPC.ComputerID);
        pcModel.updatePC(updatedPC.ComputerID, query, params);
        return this.getPcByIdWithComponents(updatedPC.ComputerID);
    }
}
function getComponentName(typeID: number): string {
    switch (typeID) {
        case 1:
            return 'videoCard';
        case 2:
            return 'processor';
        case 3:
            return 'ram';
        case 4:
            return 'hardDrive';
        case 5:
            return 'motherboard';
        case 6:
            return 'powerSupply';
        default:
            return '';
    }
}
export default new PcService();
