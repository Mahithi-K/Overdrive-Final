type OpenAIResponseOutputItem = {
    type?: string;
    role?: string;
    content?: Array<{
        type?: string;
        text?: string;
    }>;
};

type OpenAIResponsePayload = {
    output?: OpenAIResponseOutputItem[];
};

function extractAssistantText(payload: OpenAIResponsePayload) {
    const messageItem = payload.output?.find((item) => item.type === 'message' && item.role === 'assistant');
    const textParts = messageItem?.content
        ?.filter((part) => part.type === 'output_text' && typeof part.text === 'string')
        .map((part) => part.text?.trim())
        .filter(Boolean);

    return textParts?.join('\n\n') ?? '';
}

export async function generateBotReply(userMessage: string, username: string) {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY is not configured.');
    }

    const model = process.env.OPENAI_MODEL?.trim() || 'gpt-5';

    const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            store: false,
            instructions: 'You are Overdrive, a stylish Discord racing bot. Be friendly, concise, and conversational. You can chat casually, but stay grounded and avoid claiming to perform actions you cannot actually do. If users ask about races, betting, abilities, or the game, answer in the theme of the Overdrive world.',
            input: [
                {
                    role: 'user',
                    content: `User ${username} says: ${userMessage}`
                }
            ]
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI request failed with ${response.status}: ${errorText}`);
    }

    const payload = await response.json() as OpenAIResponsePayload;
    const text = extractAssistantText(payload);

    if (!text) {
        throw new Error('OpenAI returned an empty response.');
    }

    return text;
}
