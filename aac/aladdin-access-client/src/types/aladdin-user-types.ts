export type AladdinUser = {
    firstName: string;
    lastName: string;
    email: string;
    
}

export type AladdinUserKeys = keyof AladdinUser;

export type GroupPermission = {
    name: string;
    permitted: boolean;
}

export type AladdinSecurityGroup = {
    name: string;
    permissions: GroupPermission[];
}

