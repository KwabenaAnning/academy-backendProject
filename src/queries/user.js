const createUser = `
    INSERT INTO users(
        firstname,
        lastname,
        email,
        phone_number,
        password
    )
    VALUES($1,$2,$3,$4,$5) RETURNING id,firstname, lastname, email, phone_number, created_at
`;
const updateUser =`
    INSERT INTO users(
        firstname,
        lastname,
        email,
        phone_number,
        password
    )
    VALUES($1,$2,$3,$4,$5) RETURNING id,firstname, lastname, email, phone_number, created_at, updated_at
`;

const findUserByEmail = `
 SELECT id, email, password FROM users WHERE email = $1
`;
const fetchUserById = `
SELECT id, email FROM users WHERE id = $1`

module.exports={
    createUser,
    findUserByEmail,
    fetchUserById,
    updateUser
}




