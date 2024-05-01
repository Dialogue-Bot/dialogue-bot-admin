export interface IUserChatAgent {
    userId: string;
    lastMessageAt: Date;
}

export interface IMessageData {
    address: string;
    message: string;
    isTest: boolean;
    type: string;
    typeName: string;
    isAgent: boolean;
}