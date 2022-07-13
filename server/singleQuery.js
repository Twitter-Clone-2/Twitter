const DATABASE_URL = "postgres://iymqgddwvkmhdp:645b50b0485b622bfd4fd7621cb69c0f14c9c7b66a7dc92da0711b2fd1c7a444@ec2-44-206-11-200.compute-1.amazonaws.com:5432/dfgoqemk9vjf9o"

const { Pool } = require('pg');

const db = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect();




async function runQuery(query) {
    console.log(query)
    try {
        const {rows} = await db.query(query);
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

const selectAllFromAccounts = `SELECT * FROM accounts;`

const dropAccounts = `DROP TABLE accounts;`
//                  TWEETS queries
const createTweet = `CREATE TABLE IF NOT EXISTS tweets
(
    id SERIAL PRIMARY KEY,
    content character varying(240) NOT NULL,
    accounts_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);`;

const selectAllTweets= `SELECT * FROM tweets;`;

const addingFKToTweetsForComments = `ALTER TABLE tweets ADD reply_id integer;`;

const alterFKReplyID = `ALTER TABLE IF EXISTS tweets
ADD CONSTRAINT fk_tweets FOREIGN KEY (reply_id)
REFERENCES public.tweets (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterTweetsTable = `ALTER TABLE IF EXISTS tweets
ADD CONSTRAINT fk_accounts FOREIGN KEY (accounts_id)
REFERENCES accounts (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;
//                  Likes Queries
const createLikesTable = `CREATE TABLE IF NOT EXISTS likes
(
    accounts_id integer,
    tweets_id integer,
    id SERIAL PRIMARY KEY
);`;

const selectAllLikes= `SELECT * FROM likes;`

const alterLikesTableFKAccounts = `ALTER TABLE IF EXISTS likes
ADD CONSTRAINT fk_accounts FOREIGN KEY (accounts_id)
REFERENCES accounts (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterLikesTableFKTweets = `ALTER TABLE IF EXISTS likes
ADD CONSTRAINT fk_tweets FOREIGN KEY (tweets_id)
REFERENCES tweets (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`
//                  Retweets Queries
const createRetweetTable =`CREATE TABLE IF NOT EXISTS retweets
(
    accounts_id integer,
    tweets_id integer,
    id SERIAL PRIMARY KEY
);`;

const selectAllRetweets= `SELECT * FROM retweets;`;

const alterRetweetsTableFKAccount =`ALTER TABLE IF EXISTS retweets
ADD CONSTRAINT fk_accounts FOREIGN KEY (accounts_id)
REFERENCES accounts (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterRetweetsTableFKTweets =`ALTER TABLE IF EXISTS retweets
ADD CONSTRAINT fk_tweets FOREIGN KEY (tweets_id)
REFERENCES tweets (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;
//                  Replies Queries
const createRepliesTable = `CREATE TABLE IF NOT EXISTS replies
(
    accounts_id integer,
    tweets_id integer,
    the_reply character varying(240) NOT NULL,
    id SERIAL PRIMARY KEY
);`;

const selectAllReplies= `SELECT * FROM replies;`;



const alterRepliesTableFKAccount = `ALTER TABLE IF EXISTS replies
ADD CONSTRAINT fk_accounts FOREIGN KEY (accounts_id)
REFERENCES accounts (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

const alterRepliesTableFKTweet = `ALTER TABLE IF EXISTS replies
ADD CONSTRAINT fk_tweets FOREIGN KEY (tweets_id)
REFERENCES tweets (id) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE NO ACTION;`;

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

const deleteRelationship = `DELETE FROM relationship WHERE id = 23`;
//runQuery(alterFKReplyID);

/*



*/

// db.query('Select * From penguins', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   db.end();
// });