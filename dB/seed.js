const dotenv = require('dotenv')
const {runQuery} = require("../src/config/database.config");
dotenv.config();
const bcrypt = require("bcrypt");

const { adminstrator_firstName: firstName, adminstrator_lastName: lastName, adminstrator_email: email, adminstrator_pwd: password, adminstrator_phone: phoneNumber,adminstrator_country:country } = process.env;
const addAdmin = `
  INSERT INTO users(
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    country,
    role
  )
  VALUES ($1,$2,$3,$4,$5,$6, $7) RETURNING id, firstName, lastname, email, country, role, created_at`;

const saltRounds = 10;
const hash = bcrypt.hashSync(password, saltRounds);
  const run = () => {
      console.log("started seeding...please wait")
      const response = runQuery(addAdmin, [firstName, lastName, email,  hash, phoneNumber, country, "superAdminstrator"]).then(() => {
          console.log("seeding has been successful for superAdmin")
          process.exit(0);
      }).catch((error) => {
          console.log("Error", error.message)
          process.exit(1);
      });
  }
run();