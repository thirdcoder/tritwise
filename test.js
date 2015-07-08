'use strict';

var test = require('tape');
var tritwise = require('./');
var bts2n = require('balanced-ternary').bts2n;
var n2bts = require('balanced-ternary').n2bts;
var STI_5 = tritwise.STI_5;
var FD_5 = tritwise.FD_5;
var TOR_5 = tritwise.TOR_5;
var TAND_5 = tritwise.TAND_5;
var BUT_5 = tritwise.BUT_5;

test('simple ternary inverter', function(t) {
  t.equal(STI_5(bts2n('1100i')), bts2n('ii001'));
  t.equal(STI_5(bts2n('000i1')), bts2n('0001i'));
  t.end();
});

test('forward diode', function(t) {
  t.equal(FD_5(bts2n('1100i')), bts2n('11000'));
  t.end();
});

test('dyadic ternary or/maximum', function(t) {
  t.equal(TOR_5(bts2n('101ii'),
                bts2n('ii01i')),
                bts2n('1011i'));

  t.end();
});

test('dyadic ternary and/minimum', function(t) {
  t.equal(TAND_5(bts2n('101ii'),
                 bts2n('ii01i')),
                 bts2n('ii0ii'));
  t.end();
});

test('dyadic ternary but', function(t) {
  t.equal(BUT_5(bts2n('101ii'),
                bts2n('ii01i')),
                bts2n('i00ii'));
  t.end();
});
