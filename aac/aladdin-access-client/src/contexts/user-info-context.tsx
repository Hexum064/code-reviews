import { createContext, useState, useContext } from 'react';
import { AppProviderProps } from '../types/provider-children-types';
import { UserInfo } from '../types/user-info-types';


const defaultUserInfo: UserInfo = { email: '', isAdmin: false };
const UserInfoContext = createContext<UserInfo>(defaultUserInfo);
const UpdateUserInfoContext = createContext<(userInfo: UserInfo, skipPersist?: boolean) => void>(
    (i) => i
);

export function useUserInfo() {    
    return useContext(UserInfoContext);
}

export function useUpdateUserInfo() {
    return useContext(UpdateUserInfoContext);
}

export function UserInfoProvider({ children }: AppProviderProps) {
    const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);

    return (
        <UpdateUserInfoContext.Provider value={setUserInfo}>
            <UserInfoContext.Provider value={userInfo}>{children}</UserInfoContext.Provider>
        </UpdateUserInfoContext.Provider>
    );
}
