const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const bindAll = require('bind-all')
const util = require('util')
const asyncHandler = require('express-async-handler')
const { exec } = require('child_process')

// env variables
const hidDevice = process.env.HID_DEVICE || '/dev/hidg0'
const dbFilename = process.env.DB_FILENAME || './app.db'
const port = process.env.PORT || 8005

// table names used in sqlite database
const TABLE_NAMES = {
    SWITCHES: 'switches',
}

// promisify db instance
const db = new sqlite3.Database(dbFilename)
const run = util.promisify(bindAll(db).run)
const getAll = util.promisify(bindAll(db).all)
const getFirst = util.promisify(bindAll(db).get)

// setup and configure web server
const app = express()
app.use('/', express.static('frontend'))
app.use(express.json())
app.use(cors())

// GET /api/switches
app.get('/api/switches', asyncHandler(async (req, res) => 
    res.json(await getAll(`SELECT * FROM switches;`))))

// GET /api/switch/:id
app.get('/api/switch/:id', asyncHandler(async ({params}, res) => {
    // get keycode from switch id
    const {keycode} = await getFirst(`
        SELECT keycode 
        FROM ${TABLE_NAMES['SWITCHES']}
        WHERE id = '${params.id}'
    `)
    console.log(`ACTUATE ${keycode}`)
    exec(`echo "${keycode}" | ./gadget ${hidDevice} keyboard`)
    res.json({success: true})
}))

// POST /api/switches
app.post('/api/switches', asyncHandler(async ({body}, res) => {
    // truncate switches table and rebuild it
    await run(`delete from ${TABLE_NAMES['SWITCHES']};`)
    await Promise.all(body.switches.map(switchItem => run(`
            insert into ${TABLE_NAMES['SWITCHES']}
            (id, name, keycode) VALUES
            ('${switchItem.id}', '${switchItem.name}', '${switchItem.keycode}');
        `)))
    res.json({success: true})
}))

const firstRun = async () => {
    const {tableExists} = await getFirst(`
        SELECT exists(
            select name 
                from sqlite_schema 
                where type='table' 
                and name='${TABLE_NAMES['SWITCHES']}'
            ) as tableExists;`)
    if (tableExists != 1) {
        await run(`
        CREATE TABLE ${TABLE_NAMES['SWITCHES']} (
            id varchar,
            name varchar,
            keycode varchar
        );`)
    }
}


firstRun()
    .then(() =>
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    )