const pool = require("./dataBase/index");
const { endPool, startPool } = require("./dataBase/index");

async function findConversations(req,res){
    const db = await startPool();
    const {id} = req.params;
    const queryToGetRoomID = `SELECT * FROM room_and_messages WHERE user_id = ${id};`

    try{
        const resultForRoomID = await db.query(queryToGetRoomID);
        if(resultForRoomID.rows.length === 0){
            res.status(200).send([]);
            endPool(db);
            return;
        }
        const idArr = resultForRoomID.rows.map((roomObjs) => roomObjs.room_id);
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

async function createRoom(req,res){
    const db = await startPool();
    const {curr_user_id, other_user_id} = req.body;
    const queryToMakeANewRoom = `INSERT INTO room DEFAULT VALUES RETURNING id;`
    const queryToFindAllRoomsUserIsIn = `SELECT * FROM room_and_messages WHERE user_id = ${curr_user_id}`;
    try{
        resultForAllRooms = await db.query(queryToFindAllRoomsUserIsIn);
        roomIdArr = resultForAllRooms.rows.map((room) => room.room_id);
        const queryToGetOtherUsersInTheSameRoom = `SELECT * FROM room_and_messages WHERE room_id = ANY(ARRAY[${roomIdArr}]) AND user_id != ${curr_user_id};`;
        resultForAllOtherUsers = await db.query(queryToGetOtherUsersInTheSameRoom);
        otherUsersArr = resultForAllOtherUsers.rows.filter((user)=> user.user_id == other_user_id);
        if(otherUsersArr.length === 0){
            const id = await db.query(queryToMakeANewRoom)
            const queryToAddUsersToNewRoom = `INSERT INTO room_and_messages (room_id , user_id) 
            VALUES 
            (${id.rows[0].id}, ${curr_user_id}),
            (${id.rows[0].id}, ${other_user_id});`;

            await db.query(queryToAddUsersToNewRoom)
            console.log("new room created");
            res.status(200).send(true);
            endPool(db)
        }else{
            res.status(200).send(false)
            console.log("room already exist")
            endPool(db)
        }
    }catch(e){
        console.error(e.stack);
        res.status(400);
        endPool(db);
    }
}

// async function grabRoomId(req,res){
//     const db = await startPool();
//     const {other_user_id, user_id } = req.params;
//     const queryToFindAllRoomsUserIsIn = `SELECT * FROM room_and_messages WHERE user_id = ${curr_user_id}`;
// }

module.exports = {
    findConversations,
    createRoom,
  };
