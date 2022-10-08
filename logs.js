// const readline = require('readline');
// const fs = require('fs');

// const FILE_LOG = './file/access_tmp.log';

// async function processLineByLine() {
//     const fileStream = fs.createReadStream(FILE_LOG);

//     const rl = readline.createInterface({
//         input: fileStream,
//         crlfDelay: Infinity,
//     });

//     for await (const line of rl) {
//         if (/89.123.1.41/i.test(line)) {
//             await fs.appendFile(
//                 './file/89.123.1.41_requests.log',
//                 line + '\n',
//                 (err) => {
//                     if (err) console.log(data);
//                 }
//             );
//         } else if (/34.48.240.111/i.test(line)) {
//             await fs.appendFile(
//                 './file/34.48.240.111_requests.log',
//                 line + '\n',
//                 (err) => {
//                     if (err) console.log(data);
//                 }
//             );
//         }
//     }
// }

// processLineByLine();

const fs = require("fs");
const { Transform } = require("stream");

class Index {

    constructor() {
        this.readStream = fs.createReadStream("./log/access.log", "utf-8")
        this.ip = ["89.123.1.41", "34.48.240.111"]
    }

    run() {
        this.ip.map(ip => this.forArray(ip))
    }

    regTransLog (ip) {
        return new Transform({
            transform(chunk, _encoding, callback) {
                const searchArray = chunk.toString().match(new RegExp(`^${ip}+...+\"`, "gm"));
                let arrayChunk = searchArray.join("\n") + "\n";
                callback(null, arrayChunk);
            },
        });
    }

    forArray(ip) {
            let outFile = `./log/%${ip}%_requests.log`
            let transformStream = this.regTransLog(ip)
            const writeStream = fs.createWriteStream(outFile, "utf-8");
            this.readStream.pipe(transformStream).pipe(writeStream);
    }
}


const app = new Index()

app.run()