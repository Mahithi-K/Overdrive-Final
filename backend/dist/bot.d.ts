export declare const activeSessions: Map<string, any>;
export declare function saveSessions(): void;
export declare let gameLooping: boolean;
export declare let activeGameAuthorId: string | null;
export declare function initBot(token: string, clientId: string, webUrl: string, guildId?: string): Promise<void>;
export declare function broadcastToDiscord(channelId: string, message: string): Promise<void>;
//# sourceMappingURL=bot.d.ts.map