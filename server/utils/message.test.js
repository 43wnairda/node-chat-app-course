var expect = require('expect');

var {generateMessage} = require('./message');

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
