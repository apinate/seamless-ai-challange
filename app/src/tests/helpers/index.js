export const event = { preventDefault: () => null, stopPropagation: () => null };

export const eventWithValue = value => ({ ...event, target: { value } });
