import * as express from 'express';
import * as mongoose from 'mongoose';
import routes from './src/routes/crmRoutes';
import Messenger from './src/controllers/createMessage';
import { Settings } from './settings';
import * as dotenv from 'dotenv';
dotenv.config();
const dbUserPass: string = process.env.DB_CREDENTIALS;

const app: any = express();

// instance of messenger class
let messages = new Messenger(Settings.PORT);

// Mongoose connection to Mongo Atlas
mongoose.connect(`mongodb+srv://${dbUserPass}@coder-g8zwo.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

// Body Parser bundled with Express @4.16+
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

interface Name {
	firstName: string;
}

// Example function with interface
const nameCreator = (name: Name): string => {
	return `Hello, ${name.firstName},`;
}

let myName = {firstName: 'Stickman'};

// Serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
	res.send(messages.messagePrint())
);

app.listen(Settings.PORT, () =>
	console.log(nameCreator(myName), messages.messagePrint())
);

