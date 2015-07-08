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

// STI
console.log(pad(5, n2bts(unary_tritwise_op(bts2n('10i'), bts2n('0011i'), 5)), '0'));


