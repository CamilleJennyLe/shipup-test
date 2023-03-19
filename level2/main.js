var fs = require('fs');
var addDays = require('date-fns/addDays')
var format = require('date-fns/format')
var eachWeekendOfInterval = require('date-fns/eachWeekendOfInterval')


function writeResult (object) {
    let json = JSON.stringify(object);
    fs.writeFile('./level2/data/result.json', json, 'utf8', () => { });
}

function calculateDeliveries (input) {
    let result = input.packages.map(package => {
        let carrier = input.carriers.find(carrier => carrier.code === package.carrier);
        let carrierPromise = carrier.delivery_promise;
        let shipping_date = new Date(package.shipping_date);
        let delivery_date = calculateDaysToAdd(shipping_date, carrierPromise, carrier.saturday_deliveries)
        return {
            package_id: package.id,
            expected_delivery: format(delivery_date, 'yyyy-MM-dd')
        }
    })
    return result
}

function calculateDaysToAdd (startDate, noOfDaysToAdd, saturdayDeliveries) {
    let endDate = startDate, count = 0;
    while (count < noOfDaysToAdd) {
        endDate = addDays(endDate, 1);
        if (endDate.getDay() !== 0 && (endDate.getDay() !== 6 || endDate.getDay() === 6 && saturdayDeliveries === true)) {
            count++;
        }

    }
    return endDate
}

fs.readFile('./level2/data/input.json', 'utf8', function (err, data) {
    writeResult(calculateDeliveries(JSON.parse(data)));
})