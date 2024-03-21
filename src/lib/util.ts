export const copyStruct = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T;
