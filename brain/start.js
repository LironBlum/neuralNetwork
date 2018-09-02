const express = require('express');
const path = require('path');
const swaggerDoc = require('./app/swagger.json');
const swaggerTools = require('swagger-tools');
const env = process.env

const [major, minor] = process.versions.node.split('.').map(parseFloat); // verify node 8.3+

if (major <= env.NODE_VERSION_MAJOR && minor <= env.NODE_VERSION_MINOR) {
  console.log('Node version is not supported\n ');
	process.exit();
}

require('dotenv').config({ path: 'variables.env' }); // import environmental variables from variables.env file

const app = express();

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator({
    validateResponse: true,
  }));
  app.use(middleware.swaggerRouter({
    controllers: path.join(__dirname, 'routes/'),
  }));
  app.use(middleware.swaggerUi());
  app.use((err, req, res, next) => {
    if (err.failedValidation) {
      if (err.originalResponse) { 
       console.error(`response validation: ${err.results.errors}`)
      } else { 
        console.error(`request validation: ${err.message}`)
      }
      res.status(500).json({status: 'validation error'})
      
    } else {
      console.error(`other error ${err.message}`)
      res.status(500).json({ status: 'other error' });
    }
    next();
  });
  const server = app.listen(env.PORT, () => {
    console.log(`Express running → PORT ${server.address().port}, Using HTTP`);
  });
});


module.exports = app;
