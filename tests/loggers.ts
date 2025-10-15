import fs from "fs";

export const testData = (source: string, data: any) => {
  const logFile = "./tests/test.txt";
  const entry = {
    source,
    status: data.status,
    body: data.body,
    time: new Date().toISOString(),
  };

  // ✅ Append a new JSON object with clear separation
  fs.appendFileSync(logFile, JSON.stringify(entry, null, 2) + ",\n", "utf8");
};

export const errorLogger = (source: string, error: any) => {
  const logFile = "./tests/test-error.txt";
  const entry = {
    source,
    error: error,
    time: new Date().toISOString(),
  };

  // ✅ Append a new JSON object with clear separation
  fs.appendFileSync(logFile, JSON.stringify(entry, null, 2) + ",\n", "utf8");
};
