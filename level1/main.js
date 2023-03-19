var fs = require('fs');
var addDays = require('date-fns/addDays')
var format = require('date-fns/format')


function writeResult (object) {
    let json = JSON.stringify(object);
    fs.writeFile('./level1/data/result.json', json, 'utf8', () => { });
}

function calculateDeliveries (input) {
    let result = input.packages.map(package => {
        let carrierPromise = input.carriers.find(carrier => carrier.code === package.carrier).delivery_promise;
        let delivery_date = addDays(new Date(package.shipping_date), carrierPromise + 1);
        return {
            package_id: package.id,
            expected_delivery: format(delivery_date, 'yyyy-MM-dd')
        }
    })
    return result
}

fs.readFile('./level1/data/input.json', 'utf8', function (err, data) {
    writeResult(calculateDeliveries(JSON.parse(data)));
})