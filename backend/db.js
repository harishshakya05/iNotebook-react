const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017/inotebook';
mongoose.connect(mongoURL)
.then(() => console.log('DB Connected!'));

