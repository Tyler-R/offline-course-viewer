var pg = require('pg'),
    config = require('../../config/database.js');

var client = new pg.Client(config);

function createCourseTable() {
    client.connect((err) => {
        if (err) {
            console.log(err.message, err.stack);
            return;
        }

        // execute a query on our database
        client.query(`CREATE TABLE IF NOT EXISTS course
                    (id uuid,
                    name text NOT NULL UNIQUE,
                    PRIMARY KEY (id))`
        ).then(() => {
            console.log("Course table created.");
        });
    });
}

createCourseTable();
