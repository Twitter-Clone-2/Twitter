//go into .env for DATABASE_URL
const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect();

async function runQuery(query) {
  console.log(query);
  try {
    const { rows } = await db.query(query);
    console.log(rows);
  } catch (e) {
    console.log(e);
  }
  db.end();
}

//                               ACCOUNT QUERIES
const createAccountsTable = `CREATE TABLE IF NOT EXISTS accounts
(
    id SERIAL PRIMARY KEY,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    email character varying(255) NOT NULL,
    bio character varying(150),
    location character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT accounts_email_key UNIQUE (email),
    CONSTRAINT accounts_username_key UNIQUE (username)
);`;

const selectAllFromAccounts = `SELECT * FROM accounts;`;

//const addProfilePicColumn = `ALTER TABLE accounts DROP profile_picture`;
const addProfilePicColumn = `ALTER TABLE accounts ADD profile_picture character varying(3500) `;
const addBackgroundPicColumn = `ALTER TABLE accounts ADD background_picture character varying(3500) `;

const dropAccounts = `DROP TABLE accounts;`;
//                  TWEETS queries
const createTweet = `CREATE TABLE IF NOT EXISTS tweets
(
    id SERIAL PRIMARY KEY,
    content character varying(240) NOT NULL,
    accounts_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);`;

const selectAllTweets = `SELECT * FROM tweets;`;

const addingFKToTweetsForComments = `ALTER TABLE tweets ADD reply_id integer;`;

const addingFKToTweetsForRetweets = `ALTER TABLE tweets ADD FOREIGN KEY (retweet_id) REFERENCES tweets(id);`;
const addingFKToTweetsForRetweets2 = `ALTER TABLE tweets ADD FOREIGN KEY (retweet_user_id) REFERENCES accounts(id);`;

const alterFKReplyID = `ALTER TABLE IF EXISTS tweets
ADD CONSTRAINT fk_tweets FOREIGN KEY (reply_id)
REFERENCES public.tweets (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterFKRetweetID = `ALTER TABLE IF EXISTS tweets
ADD CONSTRAINT fk_tweets FOREIGN KEY (retweet_id)
REFERENCES public.tweets (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterFKRetweetUserID = `ALTER TABLE IF EXISTS tweets
ADD CONSTRAINT fk_tweets FOREIGN KEY (reply_id)
REFERENCES public.tweets (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterTweetsTable = `ALTER TABLE IF EXISTS tweets
ADD CONSTRAINT fk_accounts FOREIGN KEY (accounts_id)
REFERENCES accounts (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const deleteTweetCol = `ALTER TABLE tweets DROP retweet_id; `;
//                  Likes Queries
const createLikesTable = `CREATE TABLE IF NOT EXISTS likes
(
    accounts_id integer,
    tweets_id integer,
    id SERIAL PRIMARY KEY
);`;

const selectAllLikes = `SELECT * FROM likes;`;

const alterLikesTableFKAccounts = `ALTER TABLE IF EXISTS likes
ADD CONSTRAINT fk_accounts FOREIGN KEY (accounts_id)
REFERENCES accounts (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterLikesTableFKTweets = `ALTER TABLE IF EXISTS likes
ADD CONSTRAINT fk_tweets FOREIGN KEY (tweets_id)
REFERENCES tweets (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;
//                  Retweets Queries
const createRetweetTable = `CREATE TABLE IF NOT EXISTS retweets
(
    accounts_id integer,
    tweets_id integer,
    id SERIAL PRIMARY KEY
);`;

const selectAllRetweets = `SELECT * FROM retweets;`;

const alterRetweetsTableFKAccount = `ALTER TABLE IF EXISTS retweets
ADD CONSTRAINT fk_accounts FOREIGN KEY (accounts_id)
REFERENCES accounts (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterRetweetsTableFKTweets = `ALTER TABLE IF EXISTS retweets
ADD CONSTRAINT fk_tweets FOREIGN KEY (tweets_id)
REFERENCES tweets (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const addCreatedAtToRetweets = `ALTER TABLE retweets ADD created_at timestamp without time zone DEFAULT now()`;
//                  Relationship queries (follower, following)

const createRelationshipTable = `CREATE TABLE IF NOT EXISTS relationship
(
    follower integer,
    following integer,
    id SERIAL PRIMARY KEY
);`;

const alterRelationshipTable = `ALTER TABLE IF EXISTS relationship
ADD CONSTRAINT fk_accounts FOREIGN KEY (follower)
REFERENCES public.accounts (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const selectRelationships = `SELECT * FROM relationship;`;

const followAnotherUser = `INSERT INTO relationship (follower, following) VALUES (1,2);`;

const deleteRelationship = `DELETE FROM relationship WHERE id = 832635645542367233`;

//                  Messages

const createMessagesTable = `CREATE TABLE IF NOT EXISTS messages
(
    id SERIAL PRIMARY KEY,
    user_sent_message integer,
    message character varying(240) NOT NULL,
    room_number integer,
    liked integer,
    created_at timestamp without time zone DEFAULT now()
);`;

const alterMessagesFKAccount = `ALTER TABLE IF EXISTS messages
ADD CONSTRAINT fk_accounts FOREIGN KEY (user_sent_message)
REFERENCES public.accounts (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterMessagesFKRoom = `ALTER TABLE IF EXISTS messages
ADD CONSTRAINT fk_room FOREIGN KEY (room_number)
REFERENCES public.room (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;
//                  Room for socket io
const createRoomTable = `CREATE TABLE IF NOT EXISTS room
(
    id SERIAL PRIMARY KEY,
    room_name character varying(60),
    created_at timestamp without time zone DEFAULT now()
);`;

const insertValueIntoRoomForTest = `INSERT INTO room DEFAULT VALUES`;

const test = `INSERT INTO room DEFAULT VALUES RETURNING id;`;

//                     Union Table for Messages and Room
const createRoomAndMessagesUnionTable = `CREATE TABLE IF NOT EXISTS room_and_messages
(
    id SERIAL PRIMARY KEY,
    room_id integer,
    user_id integer,
    created_at timestamp without time zone DEFAULT now()
);`;

const alterMessagesAndRoomFKAccount = `ALTER TABLE IF EXISTS room_and_messages
ADD CONSTRAINT fk_accounts FOREIGN KEY (user_id)
REFERENCES public.accounts (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterMessagesAndRoomFKRoom = `ALTER TABLE IF EXISTS room_and_messages
ADD CONSTRAINT fk_room FOREIGN KEY (room_id)
REFERENCES public.room (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const insertIntoMessageAndRoomForTest = `INSERT INTO room_and_messages (room_id, user_id) VALUES (2, 2);`;

const delete1 = "DELETE FROM accounts WHERE id = 25";
const deleteRelationship1 = `DELETE FROM relationship WHERE id = 833704888813879297`;

// runQuery(deleteRelationship1);

// const addingFKToTweetsForComments = `ALTER TABLE tweets ADD reply_id integer;`;

// const addingFKToTweetsForRetweets = `ALTER TABLE tweets ADD FOREIGN KEY (retweet_id) REFERENCES tweets(id);`;
// const addingFKToTweetsForRetweets2 = `ALTER TABLE tweets ADD FOREIGN KEY (retweet_user_id) REFERENCES accounts(id);`;

// const alterFKRetweetID = `ALTER TABLE IF EXISTS tweets
// ADD CONSTRAINT fk_tweets FOREIGN KEY (retweet_id)
// REFERENCES public.tweets (id) MATCH SIMPLE
// ON UPDATE NO ACTION
// ON DELETE NO ACTION;`;

// const alterFKRetweetUserID = `ALTER TABLE IF EXISTS tweets
// ADD CONSTRAINT fk_tweets FOREIGN KEY (reply_id)
// REFERENCES public.tweets (id) MATCH SIMPLE
// ON UPDATE NO ACTION
// ON DELETE NO ACTION;`;
