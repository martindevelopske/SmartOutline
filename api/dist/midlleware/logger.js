import { format } from "date-fns";
import { v4 } from "uuid";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
const uuid = v4;
const moduleUrl = import.meta.url;
const currentDir = dirname(fileURLToPath(moduleUrl));
export const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(currentDir, "..", "logs"))) {
            await fsPromises.mkdir(path.join(currentDir, "..", "logs"));
        }
        const exists = await fs.existsSync(path.join(currentDir, "..", "logs"));
        await fsPromises.appendFile(path.join(currentDir, "..", "logs", logFileName), logItem);
    }
    catch (err) { }
};
export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    next();
};
//# sourceMappingURL=logger.js.map