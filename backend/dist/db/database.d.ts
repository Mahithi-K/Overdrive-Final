type AbilityInventory = {
    nitro: number;
    risk: number;
    shield: number;
    collide: number;
};
type User = {
    id: string;
    username: string | null;
    balance: number;
    wins: number;
    total_earnings: number;
    abilities: AbilityInventory;
};
export declare function purchaseAbility(id: string, ability: keyof AbilityInventory): {
    success: boolean;
    message: string;
    user?: never;
} | {
    success: boolean;
    user: User;
    message?: never;
};
export declare function consumeAbility(id: string, ability: keyof AbilityInventory): {
    success: boolean;
    message: string;
    user?: never;
} | {
    success: boolean;
    user: User;
    message?: never;
};
export declare function initDB(): void;
export declare function getUser(id: string): User;
export declare function updateUsername(id: string, username: string): void;
export declare function updateUserStats(id: string, amount: number, isWin: boolean): void;
export declare function getLeaderboard(): {
    id: string;
    username: string | null;
    balance: number;
    wins: number;
    total_earnings: number;
}[];
export {};
//# sourceMappingURL=database.d.ts.map