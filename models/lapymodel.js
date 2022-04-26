const { DateTime } = require('luxon');
const { v4: uuidv4 } = require('uuid');

const categories =["MACBOOK PRO", "LENOVO"];

const trades = [
    {
        id: '1',
        image:'/images/lap.png',
        title: 'M1 chip MAC book pro',
        specification: 'Stay connected with the 720p webcam, 2x2 WiFi 5 (802.11 ac), and Bluetooth 4.2 combo with WiFi card. You will also have 2 x USB 3.1 Gen 12 (Type-C) ports, 2 x USB 3.1 Gen 12 (Type-A) ports, a microSD Card Reader, and an audio combo jack',
        modlenumber: 'T980',
        category:"MACBOOK PRO",
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        image:'/images/lap.png',
        title: 'Lenovo Thinkpad ',
        specification: 'Stay connected with the 720p webcam, 2x2 WiFi 5 (802.11 ac), and Bluetooth 4.2 combo with WiFi card. You will also have 2 x USB 3.1 Gen 12 (Type-C) ports, 2 x USB 3.1 Gen 12 (Type-A) ports, a microSD Card Reader, and an audio combo jack',
        modlenumber: 'T680',
        category:"LENOVO",
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '3',
        image:'/images/lap.png',
        title: 'M1 chip MAC book Air',
        specification: 'Stay connected with the 720p webcam, 2x2 WiFi 5 (802.11 ac), and Bluetooth 4.2 combo with WiFi card. You will also have 2 x USB 3.1 Gen 12 (Type-C) ports, 2 x USB 3.1 Gen 12 (Type-A) ports, a microSD Card Reader, and an audio combo jack',
        modlenumber: 'M1 chip',
        category:"MACBOOK PRO",
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '4',
        image:'/images/lap.png',
        title: 'Thinkpad carbonX1 ',
        specification: 'Stay connected with the 720p webcam, 2x2 WiFi 5 (802.11 ac), and Bluetooth 4.2 combo with WiFi card. You will also have 2 x USB 3.1 Gen 12 (Type-C) ports, 2 x USB 3.1 Gen 12 (Type-A) ports, a microSD Card Reader, and an audio combo jack',
        modlenumber: 'T490',
        category:"LENOVO",
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '5',
        image:'/images/lap.png',
        title: 'Macbook pro',
        specification: 'Stay connected with the 720p webcam, 2x2 WiFi 5 (802.11 ac), and Bluetooth 4.2 combo with WiFi card. You will also have 2 x USB 3.1 Gen 12 (Type-C) ports, 2 x USB 3.1 Gen 12 (Type-A) ports, a microSD Card Reader, and an audio combo jack',
        modlenumber: 'M1 chip',
        category:"MACBOOK PRO",
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '6',
        image:'/images/lap.png',
        title: 'LENOV0 T480',
        specification: 'Stay connected with the 720p webcam, 2x2 WiFi 5 (802.11 ac), and Bluetooth 4.2 combo with WiFi card. You will also have 2 x USB 3.1 Gen 12 (Type-C) ports, 2 x USB 3.1 Gen 12 (Type-A) ports, a microSD Card Reader, and an audio combo jack',
        modlenumber: 'T480',
        category:"LENOVO",
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    },
    ];

exports.findTrades = () => trades;

exports.findCategories = () => categories;

exports.findById = id => trades.find(trade => trade.id === id);

exports.save = function (trade) {
    trade.id = uuidv4();
    trade.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    // trade.image = '/images/lap.png';
    console.log("image:" + trade.image);
    if(trade.image ===''){
        trade.image = '/images/lap.png';
    }
    else{
        trade.image = '/images/'+ trade.image;
    }
    console.log("image:" + trade.image);
    if (categories.indexOf(trade.category) === -1) {
        categories.push(trade.category);
    }
    trades.push(trade);
};

exports.updateById = function (id, newTrade) {
    let trade = trades.find(trade => trade.id === id);
    if (trade) {
        if (categories.indexOf(newTrade.category) === -1) {
            categories.push(newTrade.category);
        }
        trade.title = newTrade.title;
        trade.modlenumber = newTrade.modlenumber;
        trade.category = newTrade.category;
        trade.specification = newTrade.specification;
        trade.image=newTrade.image;
        categories.forEach(category => {
            if (!trades.some(trade => trade.category === category)) {
                let catIndex = categories.indexOf(category);
                if (catIndex !== -1) {
                    categories.splice(catIndex, 1);
                }
            }
        });
        return true;
    }
    else {
        return false;
    }
}

exports.deleteById = function (id) {
    let index = trades.findIndex(trade => trade.id === id);
    if (index !== -1) {
        let deletedtrade = trades.splice(index, 1);
        if (!trades.some(trade => trade.category === deletedtrade[0].category)) {
            let catIndex = categories.indexOf(deletedtrade[0].category);
            if (catIndex !== -1) {
                categories.splice(catIndex, 1);
            }
        }
        return true;
    }
    else {
        return false;
    }
};