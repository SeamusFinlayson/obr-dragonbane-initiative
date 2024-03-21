export const copyStruct = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T;

export const setCssVar = (id: string, value: string) => document.documentElement.style.setProperty(id, value);
