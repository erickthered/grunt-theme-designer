mocha.setup('bdd');

var testArray = [1, 2, 3];

describe('Pruebas', function () {
  describe('Arreglos', function () {
    it('Should return -1 when needle is not found', function () {
      var result = testArray.indexOf(4);
      expect(result).to.be.a('number');
      expect(result).to.eql(-1);
    });

    it('Should return 0 when needle is the first element of the array', function () {
      var result = testArray.indexOf(1);
      expect(result).to.be.a('number');
      expect(result).to.eql(0);
    });
  });
});

mocha.checkLeaks();
mocha.globals(['jQuery', 'LiveReload']);
mocha.run();
