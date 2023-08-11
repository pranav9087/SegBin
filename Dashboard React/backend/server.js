const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const http = require('http');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
const bcrypt = require('bcrypt');
const Materials = require('./models/Materials');
const User = require('./models/User');
const validator = require('validator');
// Connect to MongoDB
const uri = process.env.ATLAS_URI;
const JWT = require('jsonwebtoken');
const Auth = require('./middleware/Auth');
const Cloudant = require("@cloudant/cloudant");
const vcap = require("./vcap-local"); 
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'SegBin',
}).then(() => {
    console.log('Connected to MongoDB Atlas');
    server.listen(8000, () => {
        console.log('Server is running on port 8000');
    });
    app.get('/api/materials', Auth, (req, res) => {
        function sendData() {
          
function dbCloudantConnect() {
    return new Promise((resolve, reject) => {
        Cloudant({  // eslint-disable-line
            url: vcap.services.cloudantNoSQLDB.credentials.url
        }, ((err, cloudant) => {
            if (err) {
                console.log('Connect failure: ');
                reject(err);
            } else {
                let db = cloudant.use('test');
                console.log('Connect success! Connected to DB');
                resolve(db);
            }
        }));
    });
}

let db;

(function getDbConnection() {
    console.log('Initializing Cloudant connection...', 'items-dao-cloudant.getDbConnection()');
    dbCloudantConnect().then((database) => {
        console.log('Cloudant connection initialized.', 'items-dao-cloudant.getDbConnection()');
        db = database;
        function getAllDocuments() {
            return new Promise((resolve, reject) => {
                db.list({ include_docs: true }, (err, body) => {
                    if (err) {
                        console.log('Error occurred: ' + err.message);
                        reject(err);
                    } else {
                        const documents = body.rows.map(row => row.doc);
                        resolve(documents);
                    }
                });
            });
        }
        
        function processDocumentsAndCreateNewData() {
            return getAllDocuments()
                .then(documents => {
                    const newData = {};

                    documents.forEach(doc => {
                        if (doc && doc.timestamp && doc.detected_objects) {
                            const timestamp = new Date(doc.timestamp).toISOString().split('T')[0];
                            const category = doc.detected_objects.length > 0
                                ? doc.detected_objects[0].waste_category
                                : "Category 5: Other";

                            if (!newData[timestamp]) {
                                newData[timestamp] = {};
                            }
                            if (!newData[timestamp][category]) {
                                newData[timestamp][category] = 0;
                            }
                            newData[timestamp][category]++;
                        }
                    });

                    // Fill in missing categories with 0
                    const categories = ["Category 1: Plastic Waste", "Category 2: Paper and Cardboard Waste", "Category 3: Metal Waste", "Category 4: Soil and Stones", "Category 5: Other"];
                    Object.keys(newData).forEach(timestamp => {
                        categories.forEach(category => {
                            if (!newData[timestamp][category]) {
                                newData[timestamp][category] = 0;
                            }
                        });
                    });

                    return newData;
                })
                .catch(error => {
                    console.error('Error processing documents:', error);
                    return null; // or handle the error case as needed
                });
        }
        
        // Fetch all documents and process them
        processDocumentsAndCreateNewData()
            .then(newData => {
                if (newData) {
                    res.status(200).send(newData);
                    console.log(newData);
                }
            })
            .catch(err => {
                console.error('An error occurred:', err);
            });

    }).catch((err) => {
        console.log('Error while initializing DB: ' + err.message, 'items-dao-cloudant.getDbConnection()');
        throw err;
    });
})();
        }
        sendData();
    });
    
      const createToken = (_id) => {
        return JWT.sign({ _id }, process.env.JWT_SECRET, {expiresIn: '1d'});
      }
      app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please enter all fields' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Please enter a valid email' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = createToken(user._id);
        const username = user.username;
        res.status(200).json({email, token, username});
      });

      app.post('/signup', async (req, res) => {
        const { email, username, password } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ error: 'Please enter all fields' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Please enter a valid email' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ email: email, username: username, password: hashedPassword });
        const token = createToken(newUser._id);
        res.status(200).json({email, username, token});
      });
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});





