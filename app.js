import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import logger from 'morgan';
import yaml from 'js-yaml';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import routes from './routes';

// .env
require('dotenv').config();

const app = express();
app.use(cors({
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
  methods: 'GET,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
}));
app.use(helmet({ contentSecurityPolicy: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(cookieParser());
app.use(logger('dev'));

const API_DOCS_PATH = path.resolve(__dirname, '../swagger.yaml');
const swaggerDoc = yaml.load(fs.readFileSync(API_DOCS_PATH, 'utf-8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(routes);

const port = process.env.PORT_NUM;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
