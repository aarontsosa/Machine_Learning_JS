const ml = require('ml-regression');
const csv = require('csvtojson');

const SLR = ml.SLR;

const csvFilePath = 'advertising.csv';

const readline = require('readline')
let csvData = [],
    X = [],
    y = [];

let regressionModel;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

csv()
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
        csvData.push(jsonObj);
    })
    .on('done', () => {
        dressData();
        performRegression()
    })

function performRegression() {
    regressionModel = new SLR(X, y);
    console.log(regressionModel.toString(3));
    predictOutput();
}  

function dressData() {
    csvData.forEach((row) => {
        X.push(f(row.Radio));
        y.push(f(row.Sales));
    })
}

function f(s) {
    return parseFloat(s)
}

function predictOutput(){
    rl.question('Enter input X for predicition (Press CTRL+C to exit) : ', (answer) => {
        console.log(`At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`)
        predictOutput()
    })
}