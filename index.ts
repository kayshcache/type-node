import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import Messenger from './src/controllers/createMessage';
import { Settings } from './settings';
import * as dotenv from 'dotenv';
dotenv.config();
const dbUserPass = process.env.DB_CREDENTIALS;

const app = express();

// instance of messager class
let messages = new Messenger(Settings.PORT);

// Mongoose connection
mongoose.connect(`mongodb+srv://${dbUserPass}@coder-g8zwo.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

// Body Parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

interface Name {
	firstName: string;
}

//function with interface
const nameCreator = (name: Name): string => {
	return `Hello, ${name.firstName},`;
}

let myName = {firstName: 'Manny'};

// Serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
	res.send(messages.messagePrint())
);

app.listen(Settings.PORT, () =>
	console.log(nameCreator(myName), messages.messagePrint())
);
