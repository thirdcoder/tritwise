'use strict';

var bts2n = require('balanced-ternary').bts2n;
var n2bts = require('balanced-ternary').n2bts;
var BT_DIGIT_TO_N = require('balanced-ternary').BT_DIGIT_TO_N;
var pad = require('pad');

// Unary operations
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


// Dyadic preference functions
function dyadic_pref_op(pref, input1, input2, input_width) {
  if (pref < -13 || pref > 13) throw new Error('dyadic_pref_op('+pref+'): out of range iii-111');
  var bt_pref = pad(3, n2bts(pref), '0');
  if (bt_pref.indexOf('i') === -1 || bt_pref.indexOf('0') === -1 || bt_pref.indexOf('1') === -1)
    throw new Error('dyadic_pref_op('+pref+'): preference must contain all digits i,0,1');

  var input1_bt = pad(input_width, n2bts(input1), '0');
  var input2_bt = pad(input_width, n2bts(input2), '0');

  var output_bt = '';

  for (var i = 0; i < input_width; ++i) {
    var a = input1_bt.charAt(i);
    var b = input2_bt.charAt(i);

    if (bt_pref.indexOf(a) < bt_pref.indexOf(b)) {
      // a has a higher preference than b (comes earlier in preference list), choose a
      output_bt += a;
    } else {
      // otherwise choose b (preference functions always choose one of the inputs)
      output_bt += b;
    }
  }

  var output = bts2n(output_bt);

  return output;
}

var DYADIC_PREFS = {
  TOR: 8,   // pref-10i, maximum
  TAND: -8, // pref-i01, minimum
  BUT: -2,  // pref-0i1
};

function TOR_5(a, b)  { return dyadic_pref_op(DYADIC_PREFS.TOR,  a, b, TRYTE_SIZE); }
function TAND_5(a, b) { return dyadic_pref_op(DYADIC_PREFS.TAND, a, b, TRYTE_SIZE); }
function BUT_5(a, b)  { return dyadic_pref_op(DYADIC_PREFS.BUT,  a, b, TRYTE_SIZE); }

module.exports = {
  NTI_5: NTI_5,
  STI_5: STI_5,
  PTI_5: PTI_5,
  FD_5: FD_5,
  RD_5: RD_5,

  TOR_5: TOR_5,
  TAND_5: TAND_5,
  BUT_5: BUT_5,
};
