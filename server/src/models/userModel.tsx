import pool from '../utils/db';

interface User {
  id: number;
  username: string;
  password: string;
}

export const findUserByUsername = async (username: string): Promise<User | null> => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if ((rows as User[]).length > 0) {
    return (rows as User[])[0];
  }
  return null;
};

export const createUser = async (username: string, hashedPassword: string): Promise<void> => {
  await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
};
