const pool = require("./dataBase/index");
const { endPool, startPool } = require("./dataBase/index");

async function deleteTweetAndEverythingRelated(req, res) {
  const db = await startPool();
  const { tweet_id } = req.params;

  const deleteAllLikesQuery = `DELETE FROM likes WHERE tweets_id = ${tweet_id};`;
  const deleteAllRepliesQuery = `DELETE FROM tweets WHERE reply_id = ${tweet_id};`;

  const deleteRetweets = `DELETE FROM retweets WHERE tweets_id = ${tweet_id};`;
  const deleteTweetQuery = `DELETE FROM tweets WHERE id = ${tweet_id};`;

  try {
    await db.query(deleteAllLikesQuery);
    await db.query(deleteAllRepliesQuery);
    await db.query(deleteRetweets);
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
    const queryForRetweets = `SELECT a.first_name as "retweeter_first_name", a.last_name as "retweeter_last_name" ,retweets.tweets_id, tweets.content , tweets.created_at, retweets.accounts_id, tweets.reply_id, accounts.first_name, accounts.last_name , accounts.username , accounts.profile_picture, retweets.id as "retweet", retweets.created_at as "retweet_created_at" FROM retweets 
    JOIN tweets on tweets.id = retweets.tweets_id
    JOIN accounts a on a.id = retweets.accounts_id 
    JOIN accounts on accounts.id = tweets.accounts_id
    WHERE tweets_id = ANY(ARRAY[${tweetIDArr}]);`;

    const resultsOfLikes = await db.query(queryForLikes);
    const resultOfRetweets = await db.query(queryForRetweets);

    const finalResult = {
      tweets: resultsOfTweets.rows,
      likes: resultsOfLikes.rows,
      retweets: resultOfRetweets.rows,
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

    const queryForRetweets = `SELECT a.first_name as "retweeter_first_name", a.last_name as "retweeter_last_name" ,retweets.tweets_id, tweets.content , tweets.created_at, retweets.accounts_id, tweets.reply_id, accounts.first_name, accounts.last_name , accounts.username , accounts.profile_picture, retweets.id as "retweet", retweets.created_at as "retweet_created_at" FROM retweets 
    JOIN tweets on tweets.id = retweets.tweets_id
    JOIN accounts a on a.id = retweets.accounts_id 
    JOIN accounts on accounts.id = tweets.accounts_id
    WHERE tweets_id = ANY(ARRAY[${tweetIDArr}]);`;
    const resultsOfRetweets = await db.query(queryForRetweets);

    const results = {
      tweets: resultsOfTweets.rows,
      likes: resultsOfLikes.rows,
      retweets: resultsOfRetweets.rows,
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

  const queryForRetweets = `SELECT accounts.first_name, accounts.last_name, accounts.username , accounts.id FROM retweets
  LEFT JOIN tweets ON tweets.id = retweets.tweets_id 
  LEFT JOIN accounts ON accounts.id = retweets.accounts_id 
  WHERE retweets.tweets_id = ${id};`;

  try {
    const resultForTweet = await db.query(queryForTweet);
    const resultForLikes = await db.query(queryForLikes);
    const resultForReplies = await db.query(queryForReplies);
    const resultForRetweets = await db.query(queryForRetweets);

    const replyIDArr = resultForReplies.rows.map((replyOBJ) => replyOBJ.id);
    const queryForRepliesLikes = `SELECT * FROM likes WHERE tweets_id = ANY(ARRAY[${replyIDArr}]); `;
    const queryForRepliesReplies = `SELECT * FROM tweets WHERE reply_id = ANY(ARRAY[${replyIDArr}]); `;
    const queryForRepliesRetweets = `SELECT * FROM retweets WHERE tweets_id = ANY(ARRAY[${replyIDArr}]); `;

    let holderForLikes = [];
    let holderForReplies = [];
    let holderForRetweets = [];

    if (replyIDArr.length > 0) {
      const resultForRepliesLikes = await db.query(queryForRepliesLikes);
      holderForLikes = resultForRepliesLikes.rows;

      const resultForRepliesRetweets = await db.query(queryForRepliesRetweets);
      holderForRetweets = resultForRepliesRetweets.rows;

      const resultForRepliesReplies = await db.query(queryForRepliesReplies);
      holderForReplies = resultForRepliesReplies.rows;
    }
    const results = {
      tweet: resultForTweet.rows,
      replies: resultForReplies.rows,
      likes: resultForLikes.rows,
      retweets: resultForRetweets.rows,
      replyLikes: holderForLikes,
      replyReplies: holderForReplies,
      replyRetweets: holderForRetweets,
    };
    res.status(200).send(results);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function likeOrRetweet(req, res) {
  const db = await startPool();
  const { accounts_id, tweets_id, functionality } = req.body;
  const query = `INSERT INTO ${functionality} (accounts_id, tweets_id) VALUES(${accounts_id}, ${tweets_id});`;

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

async function removeLikeOrRetweet(req, res) {
  const db = await startPool();
  const { accounts_id, tweets_id, functionality } = req.body;
  const query = `DELETE FROM ${functionality} WHERE accounts_id = ${accounts_id} AND tweets_id = ${tweets_id};`;

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
  removeLikeOrRetweet,
  likeOrRetweet,
  getOneTweetAndAllData,
  findCurrUserAndTweets,
  findAllTweetsFromFollowing,
};
