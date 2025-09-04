import { useCallback } from 'react';
import { AladdinUser } from '../types/aladdin-user-types';
    const TEST_DATA: AladdinUser[] = [
        {
            firstName: 'Bobby',
            lastName: 'Boucher',
            email: 'waterboy@gmail.com',
        },
        {
            firstName: 'Ted',
            lastName: 'Flagstad',
            email: 'tedFlagstad@yahoo.com',
        },
        {
            firstName: 'Jimmy',
            lastName: 'Johns',
            email: 'jimmyjohns@microsoft.com',
        },
        {
            firstName: 'Nick',
            lastName: 'Fury',
            email: 'fuckingcat@shield.com',
        },
        {
            firstName: 'John',
            lastName: 'Walker',
            email: 'captainamerica@wish.com',
        },
    ];
export const useGetAladdinUsers = (): (() => Promise<AladdinUser[]>) => {


    return useCallback(async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return TEST_DATA.map((o) =>({...o}));
    }, []);
};
