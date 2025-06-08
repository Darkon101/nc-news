const db = require('../db/connection')

const fetchCommentsById = (id) => {
    return db.query(`SELECT * FROM comments c WHERE c.article_id = $1 ORDER BY c.created_at DESC`, [id]).then(({rows})=>{
        const comments = rows
        return comments
    })
}

module.exports = {fetchCommentsById}