/**
 * Add New User
 */
const addUser = `
  INSERT INTO users(
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    role
  )
  VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, firstName, lastName, email, role, created_at
`;

const findUserByEmail = `
 SELECT id,  firstName, lastName, email, role, password FROM users WHERE email=$1
`

module.exports = {
    addUser,
    findUserByEmail
}