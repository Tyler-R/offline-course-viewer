var pg = require('pg'),
    config = require('../../config/database.js');

var client = new pg.Client(config);

function createWeekTable() {
    client.connect((err) => {
        if (err) {
            console.log(err.message, err.stack);
            return;
        }

        // execute a query on our database
        client.query(`CREATE TABLE IF NOT EXISTS week
                     (id uuid,
                     name text,
                     position integer,
                     courseID uuid,
                     FOREIGN KEY (courseID) REFERENCES course(id),
                     PRIMARY KEY (id))`
        ).then(() => {
            console.log("Week table created.");
        }).catch((err) => {
            console.log(err.message, err.stack);
        });
    });
}

createWeekTable();
