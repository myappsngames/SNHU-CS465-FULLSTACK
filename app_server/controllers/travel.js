const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
}

// Render travel list view
const renderTravel = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Travel';

    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No trips exist in database!";
        }
    }

    res.render('travel', {
        title: pageTitle,
        trips: responseBody,
        message
    });

};



// Get travel list
const travel = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    console.info('>> travelController.travel calling ' +
        requestOptions.url);
    
    request(
        requestOptions,
        (err, {statusCode}, body) => {
            if(err) {
                console.error(err);
            }
            renderTravel(req, res, body);
        }
    );
};

module.exports = {
    travel
}