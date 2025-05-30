const db = require('./connection')

const queryFunction = async () => {
    const users = await db.query(`SELECT * FROM users;`)
    const codingArticles = await db.query(`SELECT * FROM articles WHERE topic = 'coding';`)
    const commentsNegativeVotes = await db.query(`SELECT * FROM comments WHERE votes > 0;`)
    const topics = await db.query(`SELECT * FROM topics;`)
    const grumpy19 = await db.query(`SELECT * FROM articles WHERE author = 'grumpy19';`)
    const commentsTenVotes = await db.query(`SELECT * FROM comments WHERE votes > 10;`)
    db.end()
    console.log(users, codingArticles, commentsNegativeVotes, topics, grumpy19, commentsTenVotes)

}   

queryFunction()