type JsonParseSuccess = { success: true; data: unknown };
type JsonParseError = { success: false; error: string };
type JsonParseResult = JsonParseSuccess | JsonParseError;

export const jsonParse = (str: string): JsonParseResult => {
  try {
    const parsed = JSON.parse(str);
    return { success: true, data: parsed };
  } catch (e) {
    return { success: false, error: 'jsonにできません' };
  }
};
