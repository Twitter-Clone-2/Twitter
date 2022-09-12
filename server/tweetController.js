const pool = require("./dataBase/index");
const { endPool, startPool } = require("./dataBase/index");

async function deleteTweetAndEverythingRelated(req, res) {
  const db = await startPool();
  const { tweet_id } = req.params;

  const deleteAllLikesQuery = `DELETE FROM likes WHERE tweets_id = ${tweet_id};`;
  const deleteAllRepliesQuery = `DELETE FROM tweets WHERE reply_id = ${tweet_id};`;
  const deleteTweetQuery = `DELETE FROM tweets WHERE id = ${tweet_id};`;

  try {
    await db.query(deleteAllLikesQuery);
    await db.query(deleteAllRepliesQuery);
    await db.query(deleteTweetQuery);
    res.status(200).send(true);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function createTweet(req, res) {
  const db = await startPool();
  const { tweet, id } = req.body;
  const query = `INSERT INTO tweets (content, accounts_id) VALUES ('${tweet}', ${id});`;
  try {
    await db.query(query);
    res.status(200).send("Tweet was created succesfully");
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function findAllTweetsFromFollowing(req, res) {
  const db = await startPool();
  const { id } = req.params;
  const queryToGetFollowingIds = `SELECT following FROM relationship WHERE follower = ${id};`;

  try {
    const resultOfIds = await db.query(queryToGetFollowingIds);
    const idArr = resultOfIds.rows.map(
      (followingObject) => followingObject.following
    );
    idArr.push(id);
    const queryToGetAllTweets = `SELECT tweets.id , tweets.content , tweets.created_at, tweets.accounts_id, tweets.reply_id, accounts.first_name, accounts.last_name , accounts.username , accounts.profile_picture FROM tweets LEFT JOIN accounts ON accounts.id = tweets.accounts_id WHERE accounts_id = ANY(ARRAY[${idArr}]) ORDER BY created_at DESC;`;

    const resultsOfTweets = await db.query(queryToGetAllTweets);
    const tweetIDArr = resultsOfTweets.rows.map((tweetOBJ) => tweetOBJ.id);

    const queryForLikes = `SELECT * FROM likes WHERE tweets_id = ANY(ARRAY[${tweetIDArr}]);`;
    const resultsOfLikes = await db.query(queryForLikes);

    const finalResult = {
      tweets: resultsOfTweets.rows,
      likes: resultsOfLikes.rows,
    };

    res.status(200).send(finalResult);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function findCurrUserAndTweets(req, res) {
  const db = await startPool();
  const { id } = req.params;
  const queryForTweets = `SELECT tweets.id , tweets.content , tweets.created_at, tweets.accounts_id,  tweets.reply_id, accounts.first_name, accounts.last_name , accounts.username, accounts.profile_picture FROM tweets LEFT JOIN accounts on accounts.id = tweets.accounts_id WHERE accounts_id = ${id};`;

  try {
    const resultsOfTweets = await db.query(queryForTweets);
    const tweetIDArr = resultsOfTweets.rows.map((tweetOBJ) => tweetOBJ.id);

    const queryForLikes = `SELECT * FROM likes WHERE tweets_id = ANY(ARRAY[${tweetIDArr}]);`;
    const resultsOfLikes = await db.query(queryForLikes);

    const results = {
      tweets: resultsOfTweets.rows,
      likes: resultsOfLikes.rows,
    };
    res.status(200).send(results);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function getOneTweetAndAllData(req, res) {
  const db = await startPool();
  const { id } = req.params;
  const queryForTweet = `SELECT tweets.id , tweets.content , tweets.created_at, tweets.accounts_id, accounts.first_name, accounts.last_name , accounts.username , accounts.profile_picture FROM tweets LEFT JOIN accounts on accounts.id = tweets.accounts_id WHERE tweets.id = ${id};`;

  const queryForReplies = `SELECT tweets.id , tweets.content , tweets.created_at, tweets.accounts_id, accounts.first_name, accounts.last_name , accounts.username FROM tweets LEFT JOIN accounts on accounts.id = tweets.accounts_id WHERE tweets.reply_id = ${id};`;

  const queryForLikes = `SELECT accounts.first_name, accounts.last_name, accounts.username , accounts.id FROM likes LEFT JOIN accounts on accounts.id = likes.accounts_id WHERE likes.tweets_id = ${id};`;

  try {
    const resultForTweet = await db.query(queryForTweet);
    const resultForLikes = await db.query(queryForLikes);
    const resultForReplies = await db.query(queryForReplies);

    const replyIDArr = resultForReplies.rows.map((replyOBJ) => replyOBJ.id);
    const queryForRepliesLikes = `SELECT * FROM likes WHERE tweets_id = ANY(ARRAY[${replyIDArr}]); `;
    const queryForRepliesReplies = `SELECT * FROM tweets WHERE reply_id = ANY(ARRAY[${replyIDArr}]); `;

    let holderForLikes = [];
    let holderForReplies = [];
    if (replyIDArr.length > 0) {
      const resultForRepliesLikes = await db.query(queryForRepliesLikes);
      holderForLikes = resultForRepliesLikes.rows;

      const resultForRepliesReplies = await db.query(queryForRepliesReplies);
      holderForReplies = resultForRepliesReplies.rows;
    }
    const results = {
      tweet: resultForTweet.rows,
      replies: resultForReplies.rows,
      likes: resultForLikes.rows,
      replyLikes: holderForLikes,
      replyReplies: holderForReplies,
    };
    res.status(200).send(results);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function likeATweet(req, res) {
  const db = await startPool();
  const { accounts_id, tweets_id } = req.body;
  const query = `INSERT INTO likes (accounts_id, tweets_id) VALUES(${accounts_id}, ${tweets_id});`;

  try {
    result = await db.query(query);
    res.status(200).send(true);
    endPool(db);
  } catch (e) {
    res.status(400).send(false);
    console.error(e.stack);
    endPool(db);
  }
}

async function removeLike(req, res) {
  const db = await startPool();
  const { accounts_id, tweets_id } = req.body;
  const query = `DELETE FROM likes WHERE accounts_id = ${accounts_id} AND tweets_id = ${tweets_id};`;

  try {
    await db.query(query);
    res.status(200).send(true);
    endPool(db);
  } catch (e) {
    res.status(400).send(true);
    console.error(e.stack);
    endPool(db);
  }
}

async function createAComment(req, res) {
  const db = await startPool();
  const { content, id, fk } = req.body;
  const query = `INSERT INTO tweets (content, accounts_id, reply_id) VALUES ('${content}', ${id}, ${fk});`;

  try {
    await db.query(query);
    res.status(200).send(true);
    endPool(db);
  } catch (e) {
    res.status(400).send(false);
    console.error(e.stack);
    endPool(db);
  }
}
module.exports = {
  deleteTweetAndEverythingRelated,
  createTweet,
  createAComment,
  removeLike,
  likeATweet,
  getOneTweetAndAllData,
  findCurrUserAndTweets,
  findAllTweetsFromFollowing,
};