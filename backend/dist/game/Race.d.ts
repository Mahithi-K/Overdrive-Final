export declare class Car {
    id: string;
    ownerId?: string;
    name: string;
    speed: number;
    acceleration: number;
    luck: number;
    position: number;
    nitroBoostRemaining: number;
    shieldRemaining: number;
    riskShaftRemaining: number;
    speedPenaltyRemaining: number;
    speedPenaltyMultiplier: number;
    nitroUsed: boolean;
    shieldUsed: boolean;
    riskUsed: boolean;
    collideUsed: boolean;
    constructor(id: string, name: string, isNpc: boolean);
    tick(deltaTimeMs: number): void;
}
export declare class Race {
    id: string;
    trackLength: number;
    raceDurationMs: number;
    cars: Car[];
    status: 'waiting' | 'starting' | 'active' | 'finished';
    startTime: number;
    startCountdownAt: number;
    bettingPool: Record<string, {
        userId: string;
        amount: number;
        carId: string;
        bettorName?: string;
    }[]>;
    bettorNames: Record<string, string>;
    constructor(id: string);
    addPlayer(userId: string, username?: string): boolean;
    placeBet(userId: string, amount: number, carId: string, bettorName?: string): void;
    start(): void;
    tick(deltaTimeMs: number): void;
    triggerRandomEvent(): void;
    private findCollisionTarget;
    useAbility(userId: string, ability: string, targetId?: string): {
        success: boolean;
        message: string;
    };
    getWinner(): Car | null;
}
//# sourceMappingURL=Race.d.ts.map