'use strict';

var test = require('tape');
var tritwise = require('./');
var bts2n = require('balanced-ternary').bts2n;
var n2bts = require('balanced-ternary').n2bts;

tritwise.tryte_size = 5;

var STI = tritwise.STI;
var PTI = tritwise.PTI;
var FD = tritwise.FD;
var TOR = tritwise.TOR;
var TAND = tritwise.TAND;
var BUT = tritwise.BUT;

test('simple ternary inverter', function(t) {
  t.equal(STI(0), 0);
  t.equal(STI(1), -1);
  t.equal(STI(-1), 1);
  t.equal(STI(33), -33);
  t.equal(STI(-33), 33);
  t.equal(STI(bts2n('1100i')), bts2n('ii001'));
  t.equal(STI(bts2n('000i1')), bts2n('0001i'));
  t.end();
});

test('positive ternary inverter', function(t) {
  t.equal(PTI(-8), 119);
  t.equal(PTI(bts2n('00i01')), bts2n('1111i'));
  t.end();
});

test('forward diode', function(t) {
  t.equal(FD(107), 108);
  t.equal(FD(bts2n('1100i')), bts2n('11000'));
  t.end();
});

test('dyadic ternary or/maximum', function(t) {
  t.equal(TOR(bts2n('101ii'),
              bts2n('ii01i')),
              bts2n('1011i'));

  t.equal(TOR(bts2n('101ii'),
              bts2n('iiiii')),
              bts2n('101ii'));

 t.end();
});

test('dyadic ternary and/minimum', function(t) {
  t.equal(TAND(bts2n('101ii'),
                 bts2n('ii01i')),
                 bts2n('ii0ii'));
  t.end();
});

test('dyadic ternary but', function(t) {
  t.equal(BUT(bts2n('101ii'),
                bts2n('ii01i')),
                bts2n('i00ii'));
  t.end();
});
