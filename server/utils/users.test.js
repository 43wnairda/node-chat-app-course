const expect = require('expect');

const {Users} = require('./users');

describe ('Users' , () => {
  var users;
    beforeEach (() => {
      users = new Users();
      users.users = [{
        id: '1',
        name: 'Paul',
        room: 'Node course'
      }, {
        id: '2',
        name: 'Sheila',
        room: 'Kangaroo course'
      }, {
        id: '3',
        name: 'Bruce',
        room: 'Kangaroo course'
      }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Adrian',
      room: 'The office fans not'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);  //for arrays and objects you have to use toEqual
  });

  it ('should remove a user', () => {
      var userId = '1';
      var user = users.removeUser(userId);

      expect (user.id).toBe(userId);
      expect (users.users.length).toBe(2);
  });
  it ('should not remove a user', () => {
    var userId = '7';
    var user = users.removeUser(userId);

    expect (user).toNotExist();
    expect (users.users.length).toBe(3);

  });
  it ('should find a user', () => {
    var userId = users.getUser('2');

    expect (userId.id).toBe('2');
  });
  it ('should not find a user', () => {
    var userId = users.getUser('4');

    expect (userId).toNotExist();
  });

  it ('should return names for Node course', () => {
    var userList = users.getUserList('Node course');

    expect(userList).toEqual(['Paul']);
  });
  it ('should return names for Kangaroo course', () => {
    var userList = users.getUserList('Kangaroo course');

    expect(userList).toEqual(['Sheila', 'Bruce']);
  });
});
