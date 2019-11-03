const app = require('./app');


//setting the port to be listened while the server is running
//ENV = Environment variables
app.listen(process.env.PORT || 3000);