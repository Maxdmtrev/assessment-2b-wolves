// Подключаем mongoose.
const mongoose = require("mongoose");
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const faker = require('faker');
mongoose.connect('mongodb://localhost/PotluckParty', { useNewUrlParser: true });
// const userList = path.join(__dirname, 'users.txt');
// const adminList = path.join(__dirname, 'admin.txt');
// const fileWrite = './users-copy.csv';

const User = require('../models/user');
const Party = require('../models/party');

// Read and save database Users, and add mongo DB
// async function userSeedDB(path) {
//   const data = fs.readFileSync(path,'utf8').split('\n');
//   const tempData = data
//       .map((el) => el.split(','));
//   console.log(tempData);
//   for (let i = 0; i < tempData.length; i ++) {
//     const user = new User( {
//       first_name: tempData[i][0],
//       last_name: tempData[i][1],
//       date: moment(tempData[i][2]).format("MMM Do YY"),
//       status: false
//     });
//     console.log(user);
//     await user.save();
//   }
//   mongoose.connection.close();
// }
//
// // Read admin.txt and save mongoDB
// async function adminSeedDB(path) {
//   const data = fs.readFileSync(path,'utf8').split('\n');
//   const tempData = data
//       .map((el) => el.split(','));
//   // console.log(tempData);
//   for (let i = 0; i < tempData.length; i ++) {
//     const user = new Admin( {
//       login: tempData[i][0],
//       password: tempData[i][1],
//       rules: tempData[i][2]
//     });
//     console.log(user);
//     await user.save();
//   }
//   mongoose.connection.close();
// }

// Create Users with faker.npm and add mongo DB
async function userDB() {
  for (let i = 0; i < 20; i++) {
    let user = new Party({
      username: faker.name.firstName(),
      password: faker.random.number(),
      email: faker.internet.email(),
    });
    // console.log(user);
    await user.save();
  }
  mongoose.connection.close();
}

async function partyDB() {
  for (let i = 0; i < 20; i++) {
    let party = new Party({
      name: faker.address.state(),
      location: faker.address.country(),
      date: moment(faker.date.future()).format("MMM Do YY"),
      status: false
    });
    console.log(party);
    await party.save();
  }
  mongoose.connection.close();
}

// Start seed DB -------------

// ---- Create admin DB with admin.txt
// adminSeedDB(adminList);

// ---- Create admin DB with admin.txt
//userSeedDB(userList);
// const UserSeed = userSeedDB(userList)
// module.exports = UserSeed;

// ---- Create user DB with faker.npm
// userDB();
partyDB();

