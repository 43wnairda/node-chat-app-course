var expect = require('expect');

var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');


describe('generateMessage', () => {
  it('shopuld generate the correct message object', () => {
    var from = 'Adrian';
    var text = 'Hi hopney im home';

    var resultMessage = generateMessage(from, text);

    expect(200)
    expect(resultMessage.createdAt).toBeA('number');
    expect(resultMessage).toInclude ({from, text}); //good old ES6 syntax
  });

});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Admin';
    var lat = 50.796481799999995;
    var long = -0.8653333;
    var url = 'https://www.google.com/maps?q=50.796481799999995,-0.8653333';

    var resultingMess = generateLocationMessage(from, lat, long);

    expect(200)
    expect(resultingMess.createdAt).toBeA('number');
    expect(resultingMess).toInclude({from, url});

  });
});
