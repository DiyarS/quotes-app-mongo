const express = require('express');
const router = express();
const uniqid = require('uniqid');
const Quote = require('./models/quote.js');

// POST route for updating data
router.post('/quotes', function(req, res, next) {
	if (req.body.text) {
		const newQuote = {
			_id: uniqid(),
			text: req.body.text
		};

		Quote.create(newQuote, function(error, quote) {
			if (error) {
				console.log("COULDN't create quote");
				return next(error);
			} else {
				console.log('ADDED NEW QUOTE');
				res.status(200).end();
			}
		});
	} else {
		var err = new Error('Wrong quote text submitted');
		err.status = 400;
		return next(err);
	}
});

router.get('/quotes', function(req, res, next) {
	if (req.session) {
		Quote.find({}).exec(function(error, quotesArr) {
			if (error) throw error;
			else {
				res.json({
					quotes: quotesArr
				});
				res.status(200).end();
			}
		});
	} else {
		const err = new Error('Session has ended');
		throw err;
	}
});

router.delete('/quotes/:id', function(req, res, next) {
	if (req.param('id')) {
		Quote.findById(req.param('id'))
			.remove()
			.exec(function(error, quoteInstance) {
				if (error) throw error;
				else {
					console.log('Quote removed');
					res.status(200).end();
				}
			});
	} else {
		const err = new Error('Wrong ID');
		throw err;
	}
});

module.exports = router;
