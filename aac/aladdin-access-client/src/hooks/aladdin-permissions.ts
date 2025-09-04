import { useCallback } from 'react';
import { AladdinUser, AladdinSecurityGroup } from '../types/aladdin-user-types';
import { cloneGroups } from '../utils/aladdin-security-utils';

const TEST_DATA: AladdinSecurityGroup[] = [
    {
        name: 'Group A',
        permissions: [
            { name: 'Permission 1', permitted: false },
            { name: 'Permission 2', permitted: false },
            { name: 'Permission 3', permitted: false },
        ],
    },
    {
        name: 'Group B',
        permissions: [
            { name: 'Permission 4', permitted: false },
            { name: 'Permission 5', permitted: false },
            { name: 'Permission 6', permitted: false },
            { name: 'Permission 7', permitted: false },
        ],
    },
    {
        name: 'Group C',
        permissions: [
            { name: 'Permission 1', permitted: false },
            { name: 'Permission 5', permitted: false },
            { name: 'Permission 8', permitted: false },
        ],
    },
    {
        name: 'Group D',
        permissions: [
            { name: 'Permission 3', permitted: false },
            { name: 'Permission 4', permitted: false },
            { name: 'Permission 8', permitted: false },
            { name: 'Permission 9', permitted: false },
            { name: 'Permission 10', permitted: false },            
        ],
    },
];

export const useGetSecurityGroups = (): ((user: AladdinUser) => Promise<AladdinSecurityGroup[]>) => {
    return useCallback(async (user: AladdinUser) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (user.firstName.startsWith('B')) throw new Error('something broke');
        return cloneGroups(TEST_DATA);
    }, []);
};
