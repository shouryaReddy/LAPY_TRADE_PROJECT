const model = require('../models/lapymodel');

exports.index = (req, res) => {
    let trades = model.findTrades();
    let categories = model.findCategories();
    res.render('./trade/trades', { trades, categories });
};

exports.new = (req, res) => {
    res.render('./trade/newtrade');
};

exports.create = (req, res) => {
    let trade = req.body;
    console.log(trade);
    model.save(trade);
    console.log(trade);
    res.redirect('/trades');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let trade = model.findById(id);
    if (trade) {
        res.render('./trade/trade', { trade });
    }
    else {
        let err = new Error('Cannot find trade item with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let trade = model.findById(id);
    if (trade) {
        res.render('./trade/edit', { trade });
    }
    else {
        let err = new Error('Cannot find trade item with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let trade = req.body;
    let id = req.params.id;
    if (model.updateById(id, trade)) {
        res.redirect('/trades/' + id);
    }
    else {
        let err = new Error('Cannot find trade item with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/trades');
    }
    else {
        let err = new Error('Cannot find trade item with id ' + id);
        err.status = 404;
        next(err);
    }
};