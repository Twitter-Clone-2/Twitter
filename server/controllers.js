const bcrypt = require("bcrypt");
const pool = require("./dataBase/index");
const { endPool, startPool } = require("./dataBase/index");

//                ALL USER RELATED
async function getAllUsers(req, res) {
  const db = await startPool();
  const query = `SELECT * FROM accounts;`;
  try {
    const results = await db.query(query);
    res.send(results.rows);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function getOneUser(req, res) {
  const db = await startPool();
  let { id } = req.body;
  const query = `SELECT * FROM accounts WHERE id = ${id}`;
  try {
    const results = await db.query(query);
    res.send(results.rows);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function getOneUserByEmail(req, res) {
  const db = await startPool();
  let { email } = req.body;
  const query = `SELECT * FROM accounts WHERE email = '${email}'`;

  try {
    const results = await db.query(query);
    res.send(results.rows);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function register(req, res) {
  const db = await startPool();
  let { first_name, last_name, email, password, username, bio, location } =
    req.body;

  bcrypt.hash(password, 10).then((hash) => {
    password = hash;
    db.query(
      `INSERT INTO accounts (first_name, last_name , email, password, username, bio, location) VALUES ('${first_name}','${last_name}','${email}','${password}','${username}','${bio}','${location}');`
    )
      .then(() => {
        res.status(200).send("Account created");
        endPool(db);
      })
      .catch((err) => {
        console.log(err);
        endPool(db);
        return res.status(400);
      });
  });
}

async function login(req, res) {
  const db = await startPool();
  let { email, password } = req.body;
  const queryForUser = `SELECT * FROM accounts WHERE email = '${email}';`;

  try {
    const results = await db.query(queryForUser);
    let user = results.rows[0];
    if (!user) {
      endPool(db);
      return res.send(false);
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      console.log("passwords dont match");
      endPool(db);
      return res.send(false);
    }
    res.json({
      user: user,
      status: true,
    });
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function deleteUser(req, res) {
  const db = await startPool();
  const { id } = req.body;
  const query = `DELETE FROM accounts WHERE id = ${id};`;
  try {
    await db.query(query);
    res.status(200).send(`Deleted account with id of ${id}`);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

//                          ALL TWEET RELATED
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

async function findAllTweetsFromOneUser(req, res) {
  const db = await startPool();
  const { id } = req.body;
  const query = `SELECT content, created_at FROM tweets WHERE accounts_id = ${id};`;

  try {
    const results = await db.query(query);
    res.status(200).send(results);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function deleteTweetAndEverythingRelated(req,res){
  const db = await startPool();
  const {tweet_id} = req.params;

  const deleteAllLikesQuery = `DELETE FROM likes WHERE tweets_id = ${tweet_id};`;
  const deleteAllRepliesQuery = `DELETE FROM tweets WHERE reply_id = ${tweet_id};`;
  const deleteTweetQuery = `DELETE FROM tweets WHERE id = ${tweet_id};`;

  try{
    await db.query(deleteAllLikesQuery);
    await db.query(deleteAllRepliesQuery);
    await db.query(deleteTweetQuery);
    res.status(200).send(true)
    endPool(db);
  }catch(e){
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}
//                            Follow or Following status
async function findFollowers(req, res) {
  const db = await startPool();
  const { following } = req.body;
  const query = `SELECT * FROM relationship WHERE following = ${following};`;
  try {
    const results = await db.query(query);
    res.status(200).send(results);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function findFollowing(req, res) {
  const db = await startPool();
  const { follower } = req.body;
  const query = `SELECT * FROM relationship WHERE follower = ${follower};`;

  try {
    const results = await db.query(query);
    res.status(200).send(results);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function findAllRelationshipStatus(req,res){
  const db = await startPool();
  const {follower, following} = req.body;
  const query = `SELECT * FROM relationship WHERE follower = ${follower} or following = ${following};`;

  try{
   const results = await db.query(query);
   res.status(200).send(results);
   endPool(db);
  }catch(e){
    res.status(400).send(false);
    endPool(db);
  }
}

async function followAnotherUser(req, res) {
  const db = await startPool();
  const { follower, following } = req.body;
  const query = `INSERT INTO relationship (follower, following) VALUES (${follower}, ${following});`;

  try {
    await db.query(query);
    res.status(200).send(true);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function unFollowAnotherUser(req, res) {
  const db = await startPool();
  const { follower, following } = req.body;
  const query = `DELETE FROM relationship WHERE follower = ${follower} AND following = ${following};`;

  try {
    await db.query(query);
    res.status(200).send(true);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function checkFollowStatus(req, res) {
  const db = await startPool();
  const { follower, following } = req.body;
  const query = `SELECT * FROM relationship WHERE follower = ${follower} AND following = ${following};`;

  try {
    const results = await db.query(query);
    const followStatus = results.rows.length > 0
    res.status(200).send(followStatus)
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}
//                                  Likes Queries
async function likeATweet(req,res){
  const db = await startPool();
  const {accounts_id, tweets_id} = req.body;
  const query = `INSERT INTO likes (accounts_id, tweets_id) VALUES(${accounts_id}, ${tweets_id});`;

  try{
    result = await db.query(query);
    res.status(200).send(true);
    endPool(db);
  }catch(e){
    res.status(400).send(false);
    console.error(e.stack);
    endPool(db);
  }
}

async function removeLike(req,res){
  const db = await startPool();
  const {accounts_id, tweets_id} = req.body;
  const query = `DELETE FROM likes WHERE accounts_id = ${accounts_id} AND tweets_id = ${tweets_id};`;

  try{
    await db.query(query);
    res.status(200).send(true);
    endPool(db);
  }catch(e){
    res.status(400).send(true);
    console.error(e.stack)
    endPool(db);
  }
}
//                                  Comments Queries
async function createAComment(req,res){
  const db = await startPool();
  const {content, id, fk} = req.body;
  const query = `INSERT INTO tweets (content, accounts_id, reply_id) VALUES ('${content}', ${id}, ${fk});`;

  try{
    await db.query(query);
    res.status(200).send(true);
    endPool(db);
  }catch(e){
    res.status(400).send(false);
    console.error(e.stack);
    endPool(db);
  }
}
//                                  Retweet Queries
//                                  JOIN QUERIES
async function selectAllFollowersAndTheirAccounts(req,res){
  const db = await startPool();
  const {following} = req.body;
  const query = `SELECT * FROM relationship LEFT JOIN accounts ON relationship.follower = accounts.id WHERE following = ${following};`;

  try{
    const results = await  db.query(query);
    res.status(200).send(results);
    endPool(db);
  }catch(e){
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function selectAllFollowingAndTheirAccounts(req,res){
  const db = await startPool();
  const {follower} = req.body;
  const query = `SELECT * FROM relationship LEFT JOIN accounts ON relationship.following = accounts.id WHERE follower = ${follower};`;

  try{
    const results = await  db.query(query);
    res.status(200).send(results);
    endPool(db);
  }catch(e){
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function findAllTweetsFromFollowing(req,res){
  const db = await startPool();
  const { id } = req.params;
  const queryToGetFollowingIds = `SELECT following FROM relationship WHERE follower = ${id};`
  
  try {
    const resultOfIds = await db.query(queryToGetFollowingIds);
    const idArr = resultOfIds.rows.map((followingObject)=> followingObject.following);
    idArr.push(id);
    const queryToGetAllTweets = `SELECT tweets.id , tweets.content , tweets.created_at, tweets.accounts_id, tweets.reply_id, accounts.first_name, accounts.last_name , accounts.username FROM tweets LEFT JOIN accounts ON accounts.id = tweets.accounts_id WHERE accounts_id = ANY(ARRAY[${idArr}]);`;
    
    const resultsOfTweets = await db.query(queryToGetAllTweets);
    const tweetIDArr = resultsOfTweets.rows.map(tweetOBJ=> tweetOBJ.id)

    const queryForLikes = `SELECT * FROM likes WHERE tweets_id = ANY(ARRAY[${tweetIDArr}]);`;
    const resultsOfLikes = await db.query(queryForLikes);

    const finalResult = {
      tweets : resultsOfTweets.rows,
      likes : resultsOfLikes.rows
    }

    res.status(200).send(finalResult);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function findCurrUserAndTweets(req,res){
  const db = await startPool();
  const {id} = req.body;
  const queryForTweets = `SELECT tweets.id , tweets.content , tweets.created_at, tweets.accounts_id,  tweets.reply_id, accounts.first_name, accounts.last_name , accounts.username FROM tweets LEFT JOIN accounts on accounts.id = tweets.accounts_id WHERE accounts_id = ${id};`;

  try{
    const resultsOfTweets =  await  db.query(queryForTweets);
    const tweetIDArr = resultsOfTweets.rows.map(tweetOBJ=> tweetOBJ.id)

    const queryForLikes = `SELECT * FROM likes WHERE tweets_id = ANY(ARRAY[${tweetIDArr}]);`;
    const resultsOfLikes = await db.query(queryForLikes);

    const results = {
      tweets : resultsOfTweets.rows,
      likes : resultsOfLikes.rows
    }
    res.status(200).send(results);
    endPool(db);
  }catch(e){
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function getOneTweetAndAllData(req,res){
  const db = await startPool();
  const {id} = req.body;
  const queryForTweet = `SELECT tweets.id , tweets.content , tweets.created_at, tweets.accounts_id, accounts.first_name, accounts.last_name , accounts.username FROM tweets LEFT JOIN accounts on accounts.id = tweets.accounts_id WHERE tweets.id = ${id};`;

  const queryForReplies = `SELECT tweets.id , tweets.content , tweets.created_at, tweets.accounts_id, accounts.first_name, accounts.last_name , accounts.username FROM tweets LEFT JOIN accounts on accounts.id = tweets.accounts_id WHERE tweets.reply_id = ${id};`;

  const queryForLikes = `SELECT accounts.first_name, accounts.last_name, accounts.username , accounts.id FROM likes LEFT JOIN accounts on accounts.id = likes.accounts_id WHERE likes.tweets_id = ${id};`;

  try{
    const resultForTweet = await db.query(queryForTweet);
    const resultForLikes = await db.query(queryForLikes);
    const resultForReplies = await db.query(queryForReplies);

    const replyIDArr = resultForReplies.rows.map(replyOBJ=> replyOBJ.id);
    const queryForRepliesLikes = `SELECT * FROM likes WHERE tweets_id = ANY(ARRAY[${replyIDArr}]); `;

    let holder = []
    if(replyIDArr.length > 0){
      const resultForRepliesLikes = await db.query(queryForRepliesLikes);
      holder = resultForRepliesLikes.rows;
    }
    const results ={
      tweet : resultForTweet.rows,
      replies : resultForReplies.rows,
      likes : resultForLikes.rows,
      replyLikes : holder ,
    }
    res.status(200).send(results);
    endPool(db)  

  }catch(e){
    console.error(e.stack)
    res.status(400).send(false);
    endPool(db);
  }
}


module.exports = {
  getAllUsers,
  getOneUser,
  register,
  login,
  deleteUser,
  getOneUserByEmail,
  createTweet,
  findAllTweetsFromOneUser,
  followAnotherUser,
  unFollowAnotherUser,
  findFollowers,
  findFollowing,
  checkFollowStatus,
  findAllRelationshipStatus,
  selectAllFollowersAndTheirAccounts,
  selectAllFollowingAndTheirAccounts,
  findAllTweetsFromFollowing,
  likeATweet,
  removeLike,
  findCurrUserAndTweets,
  createAComment,
  getOneTweetAndAllData,
  deleteTweetAndEverythingRelated
};