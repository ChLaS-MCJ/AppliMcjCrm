/**
 * Express.js server configuration that sets up middleware, routing, and error handling.
 * @module app
 * @requires express
 * @requires helmet
 * @requires path
 * @requires cors
 * @requires cookie-parser
 * @requires ./handlers/ErrorHandlers
 * @requires ./middlewares/GuardAuth
 * @requires ./routes/Users.routes
 * @requires ./routes/Auth.routes
 */

const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandlers = require('./handlers/ErrorHandlers');
const GuardAuth = require('./middlewares/GuardAuth');

const app = express();

// Import des modules de routage
const user_router = require('./routes/Users.routes');
const auth_router = require('./routes/Auth.routes');

// Configuration de CORS à un seul endroit pour toutes les routes
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));

app.use((req, res, next) => {
  if (req.url.includes('/api')) {
    cors()(req, res, next);
  } else {
    cors()(req, res, next);
  }
});

// Config App
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Mise en place du routage
app.get('/api/', (req, res) => res.send(`🚀 I'm online. All is OK ! ⭐️`));
app.use('/api/users', GuardAuth, user_router);
app.use('/api/auth', auth_router);

// Gestionnaire d'erreurs en production
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
app.use(errorHandlers.productionErrors);
app.use(errorHandlers.notFound);

module.exports = app;
