const path = require("path");
const solc = require("solc");
const fs = require("fs-extra"); // short form for filesystem

const buildPath = path.resolve(__dirname, "build");
//removes build directory
fs.removeSync(buildPath);

//getting contract code from folder and compiles code
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const output = solc.compile(source, 1).contracts;

//creates build directory again, function checks if it exists and if it doesnt it creates it
fs.ensureDirSync(buildPath);

//runs through the output produced from compiler and saves each contract to a seperate file
// console.log(output);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
