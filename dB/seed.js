const dotenv = require('dotenv')
const {runQuery} = require("../src/config/database.config");
dotenv.config();
const bcrypt = require("bcrypt");

const { adminstrator_firstName: firstName, adminstrator_lastName: lastName, adminstrator_email: email, adminstrator_pwd: password, adminstrator_phone: phoneNumber } = process.env;
const addAdmin = `
  INSERT INTO users(
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    role
  )
  VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, firstName, lastname, email, role, created_at`;

const saltRounds = 10;
const hash = bcrypt.hashSync(password, saltRounds);
  const run = () => {
      console.log("started seeding...please wait")
      const response = runQuery(addAdmin, [firstName, lastName, phoneNumber, email, hash, "superAdminstrator"]).then(() => {
          console.log("seeding has been successful for superAdmin")
          process.exit(0);
      }).catch((error) => {
          console.log("Error", error.message)
          process.exit(1);

      });
  }
run();