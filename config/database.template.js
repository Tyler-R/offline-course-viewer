module.exports = {
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'name',
    // the type of database that will be used. Currently postgres and sqlite are suppored based on the package.json dependencies.
    dialect: 'postgres',
    // a path to the sqlite path that the database data will be stored in if sqlite is used as the database type.
    sqlitePath: '/home/path/coursera-dl-viewer/database.sqlite',
}
