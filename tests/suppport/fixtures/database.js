const {Pool} = require ('pg')

const DbConfig = {
    user: 'postgres',
    host: 'pgdb',
    database: 'zombieplus',
    password: 'dk+OpD2CXgfKG5/NAA0AS1M/Ogw3Kw==',
    port: 5432,





}

 export async function executeSQL(sqlScript){

    const pool = new Pool(DbConfig)
    const client = await pool.connect()

    const result = await client.query(sqlScript)
    console.log(result.rows)

 }