export interface FlowExtend {
    id: string;
    name: string;
    publishAt: Date;
}

export interface IFlowSetting {
    type: string;
    label: string;
    value: any
    default: any
}

export interface IFlowVariable {
    name: string;
    value: any
}