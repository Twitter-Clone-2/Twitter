const { endPool, startPool } = require("./dataBase/index");

async function findConversations(req, res) {
  const db = await startPool();
  const { id } = req.params;
  const queryToGetRoomID = `SELECT * FROM room_and_messages WHERE user_id = ${id};`;

  try {
    const resultForRoomID = await db.query(queryToGetRoomID);
    if (resultForRoomID.rows.length === 0) {
      res.status(200).send([]);
      endPool(db);
      return;
    }
    const idArr = resultForRoomID.rows.map((roomObjs) => roomObjs.room_id);
    const queryToGetEveryoneUserIsMessaging = `SELECT * FROM room_and_messages LEFT JOIN  accounts on accounts.id = room_and_messages.user_id WHERE room_and_messages.room_id = ANY(ARRAY[${idArr}]) AND room_and_messages.user_id != ${id};`;

    const results = await db.query(queryToGetEveryoneUserIsMessaging);
    res.status(200).send(results.rows);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function createRoom(req, res) {
  const db = await startPool();
  const { curr_user_id, other_user_id } = req.body;
  const queryToMakeANewRoom = `INSERT INTO room DEFAULT VALUES RETURNING id;`;
  const queryToFindAllRoomsUserIsIn = `SELECT * FROM room_and_messages WHERE user_id = ${curr_user_id}`;

  try {
    resultForAllRooms = await db.query(queryToFindAllRoomsUserIsIn);

    if (resultForAllRooms.rows.length) {
      roomIdArr = resultForAllRooms.rows.map((room) => room.room_id);

      const queryToGetOtherUsersInTheSameRoom = `SELECT * FROM room_and_messages WHERE room_id = ANY(ARRAY[${roomIdArr}]) AND user_id = ${other_user_id};`;

      resultForAllOtherUsers = await db.query(
        queryToGetOtherUsersInTheSameRoom
      );
    } else {
      resultForAllOtherUsers = { rows: [] };
    }

    if (resultForAllOtherUsers.rows.length === 0) {
      const id = await db.query(queryToMakeANewRoom);
      console.log(id);
      const queryToAddUsersToNewRoom = `INSERT INTO room_and_messages (room_id , user_id) 
            VALUES 
            (${id.rows[0].id}, ${curr_user_id}),
            (${id.rows[0].id}, ${other_user_id});`;

      await db.query(queryToAddUsersToNewRoom);
      res.status(200).send({ room_id: id.rows[0].id });
      endPool(db);
    } else {
      console.log(resultForAllOtherUsers);
      res.status(200).send(resultForAllOtherUsers.rows[0]);
      endPool(db);
    }
  } catch (e) {
    console.error(e.stack);
    res.status(400);
    endPool(db);
  }
}

async function createMessage(req, res) {
  const db = await startPool();
  const { user_id, message, room_number } = req.body;
  const query = `INSERT INTO messages (user_sent_message, message, room_number, liked) 
    VALUES ( ${user_id}, '${message}', ${room_number}, 0 );`;

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

async function findMessagesForTheRoom(req, res) {
  const db = await startPool();
  const { room_number } = req.params;
  const query = `SELECT * FROM messages WHERE room_number = ${room_number};`;

  try {
    const results = await db.query(query);
    res.status(200).send(results.rows);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

async function findLastMessage(req, res) {
  const db = await startPool();
  const { room_numbers } = req.params;
  const array = JSON.parse("[" + room_numbers + "]");
  const query = `SELECT * FROM messages where room_number = ANY(ARRAY[${array}]) ORDER BY created_at DESC;`;

  try {
    const results = await db.query(query);
    let counter = 0;
    let index = 0;
    let holderObj = {};

    while (counter < array.length && index < results.rows.length) {
      if (!holderObj.hasOwnProperty(results.rows[index].room_number)) {
        holderObj[results.rows[index].room_number] = results.rows[index];
        counter++;
      }
      index++;
    }
    res.status(200).send(holderObj);
    endPool(db);
  } catch (e) {
    console.error(e.stack);
    res.status(400).send(false);
    endPool(db);
  }
}

module.exports = {
  findConversations,
  createRoom,
  createMessage,
  findMessagesForTheRoom,
  findLastMessage,
};
