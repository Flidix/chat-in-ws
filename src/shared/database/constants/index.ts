import { DatabaseEntitiesType } from '../types';

export const databaseTables: Record<keyof DatabaseEntitiesType, string> = <const>{
    users: 'users',
    messages: 'messages',
    groups: 'groups',
    userToGroups: 'user-to-groups',
};
