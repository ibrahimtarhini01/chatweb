const io = require('socket.io')(8900, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});
let c_users = [];

const joinUser = (id, username, room) => {
  !c_users.some((user) => user.room === room) &&
    c_users.push({ room, id, username });
  return { room, id, username };
};

const userDisconnect = (id) => {
  c_users = c_users.filter((p_user) => p_user.id !== id);
};

const getUser = (room) => {
  return c_users.find((p_user) => p_user.room === room);
};

exports.run = () => {
  //initializing the socket io connection
  io.on('connection', (socket) => {
    //when ceonnect
    console.log('a user connected on ' + socket.id);

    //take roomId and socketId from room
    socket.on('joinUser', (roomId, username) => {
      const p_user = joinUser(socket.id, username, roomId);
      console.log(socket.id, '=id');
      socket.join(p_user.room);

      //display a welcome message to the user who have joined a room
      /*socket.emit('getMessage', {
        userId: p_user.id,
        username: p_user.username,
        text: `Welcome ${p_user.username}`,
      });*/

      //displays a joined room message to all other room users except that particular user
      /* socket.broadcast.to(p_user.room).emit('getMessage', {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username} has joined the chat`,
      });*/
      console.log(c_users);
    });

    //send and get message
    socket.on('sendMessage', ({ sender, room, message }) => {
      console.log(c_users);
      const p_user = getUser(room);
      console.log(sender.username);
      console.log(p_user);
      io.to(p_user.room).emit('getMessage', {
        sender,
        room,
        message,
      });
      console.log('sent', p_user);
    });

    //when disconnect
    socket.on('disconnect', () => {
      console.log('a room disconnected!');
      userDisconnect(socket.id);
      io.emit('getUsers', c_users);
    });
  });
};
