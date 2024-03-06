export interface IPC {
    ComputerID: number;
    Model: string;
    Description?: string;
    Condition: string;
    LikeCount: number;
    components?: {
        processor?: IComponent;
        videoCard?: IComponent;
        ram?: IComponent;
        hardDrive?: IComponent;
        motherboard?: IComponent;
        powerSupply?: IComponent;
    };
}
export interface IComponent {
    ComponentID: string;
    TypeID: number;
    DeviceName: string;
    Supplier: string;
    Country: string;
    PurchaseDate: string;
    ComponentDescription: string;
    DeviceInfo: string;
}
export interface ICreatePC {
    ComputerID?: number;
    Model: string;
    Description?: string;
    Condition: string;
    components?: {
        processor?: IComponentForCreate;
        videoCard?: IComponentForCreate;
        ram?: IComponentForCreate;
        hardDrive?: IComponentForCreate;
        motherboard?: IComponentForCreate;
        powerSupply?: IComponentForCreate;
    };
}
export interface IComponentForCreate {
    ComponentID: number;
    DeviceName?: string;
}
