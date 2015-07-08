'use strict';

var bts2n = require('balanced-ternary').bts2n;
var n2bts = require('balanced-ternary').n2bts;
var BT_DIGIT_TO_N = require('balanced-ternary').BT_DIGIT_TO_N;
var pad = require('pad');

function unary_tritwise_op(tt, input, input_width) {
  if (tt < -13 || tt > 13) throw new Error('unary_tritwise_op('+tt+'): out of range iii-111');
  var bt_tt = pad(3, n2bts(tt), '0');

  var input_bt = pad(input_width, n2bts(input), '0');

  var output_bt = '';

  for (var i = 0; i < input_bt.length; ++i) {
    var in_trit = BT_DIGIT_TO_N[input_bt.charAt(i)];
    var out = bt_tt.charAt(in_trit + 1);

    output_bt += out;
  }

  var output = bts2n(output_bt);

  return output;
}

var UNARY_TRUTH_TABLES = {
  NTI: 5,   // 1ii negative ternary inverter
  STI: 8,   // 10i simple ternary inverter
  PTI: 11,  // 11i positive ternary inverter
  FD: 1,    // 001 forward diode
  RD: -9,   // i00 reverse diode
};

var TRYTE_SIZE = 5;

function NTI_5(x) { return unary_tritwise_op(UNARY_TRUTH_TABLES.NTI, x, TRYTE_SIZE); }
function STI_5(x) { return unary_tritwise_op(UNARY_TRUTH_TABLES.STI, x, TRYTE_SIZE); }
function PTI_5(x) { return unary_tritwise_op(UNARY_TRUTH_TABLES.PTI, x, TRYTE_SIZE); }
function FD_5(x)  { return unary_tritwise_op(UNARY_TRUTH_TABLES.FD,  x, TRYTE_SIZE); }
function RD_5(x)  { return unary_tritwise_op(UNARY_TRUTH_TABLES.RD,  x, TRYTE_SIZE); }

// STI
//console.log(pad(5, n2bts(unary_tritwise_op(bts2n('10i'), bts2n('0011i'), 5)), '0'));

module.exports = {
  NTI_5: NTI_5,
  STI_5: STI_5,
  PTI_5: PTI_5,
  FD_5: FD_5,
  RD_5: RD_5,
};
