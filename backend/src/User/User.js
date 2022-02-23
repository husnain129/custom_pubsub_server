const pool = require('../pool');

class User {
	static async find(){
		const {rows} = await pool.query('SELECT * from users;') 
		return rows || [];
	}

	static async create(username, bio) {
		const { rows } = await pool.query(
			"INSERT INTO users (username,bio) VALUES($1,$2) RETURNING *", [username, bio]
		);
		return rows[0];
	}
}

module.exports = User;