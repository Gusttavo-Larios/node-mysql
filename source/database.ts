import mysql, { Connection } from 'mysql'

interface Query {
  id: number,
  nome: string,
  login: string,
  senha: string
}

export class Database {
  constructor() { }

  connect = (): Connection => {
    const connect = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })

    connect.connect((error) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Conectado!')
      }
    })
    return connect
  }

  searchData() {
    const connect = this.connect()
    connect.query('SELECT * FROM usuario', (error, rows: Array<Query>) => {
      rows.forEach(row => {
        console.log(row)
      });
    })
  }

  insertData() {
    const data = {
      nome: 'Emilly',
      login: 'sssss',
      senha: '*****'
    }

    const connect = this.connect()
    connect.query('INSERT INTO usuario SET ?', data, (error, response) => {
      if (error) throw error
      console.log(response.insertId)
    })
  }

  updateData() {
    const connect = this.connect()
    connect.query('UPDATE usuario SET nome = ? WHERE id = ?', ['Emilly', 1], (error, result) => {
      if (error) throw error
      console.log(result)
    })
  }

  deleteData() {
    const connect = this.connect()
    connect.query('DELETE FROM usuario WHERE id = ?', 4, (error, result) => {
      if (error) throw error

      console.log(`Deletado ${result.affectedRows} linha(s)`)
    })
  }

}