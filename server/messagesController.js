const pool = require("./dataBase/index");
const { endPool, startPool } = require("./dataBase/index");

async function findConversations(req,res){
    const db = await startPool();
    const {id} = req.params;
    const queryToGetRoomID = `SELECT * FROM room_and_messages WHERE user_id = ${id};`

    try{
        const resultForRoomID = await db.query(queryToGetRoomID);
        const idArr = resultForRoomID.map((roomObjs) => roomObjs.room_id);
        
        const queryToGetEveryoneUserIsMessaging = `SELECT * FROM room_and_messages LEFT JOIN  accounts on accounts.id = room_and_messages.user_id WHERE room_and_messages.room_id = ANY(ARRAY[${idArr}]) AND room_and_messages.user_id != ${id};`; 

        const results = await db.query(queryToGetEveryoneUserIsMessaging); 
        res.status(200).send(results.rows);
        endPool(db);
    }catch(e){
        console.error(e.stack);
        res.status(400);
        endPool(db);
    }
}

module.exports = {
    findConversations,
  };
