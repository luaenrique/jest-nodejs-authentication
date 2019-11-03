const express = require('express');

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        //telling express which body format will be received on requests.
        this.express.use(express.json());
    }

    routes() {
        //telling express where is located the routes file.
        this.express.use(require('./routes'));
    }
}

module.exports = new AppController().express;