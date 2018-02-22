var mongoose = require('mongoose');
var uniqid = require('uniqid');
var Schema = mongoose.Schema;

var QuoteSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
		default: uniqid
	},
	text: {
		type: String,
		required: true
	}
});

var Quote = mongoose.model('Quote', QuoteSchema);
module.exports = Quote;
