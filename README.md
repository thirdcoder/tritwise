# tritwise

Tritwise operations

    var tritwise = require('tritwise');

Operates on each trit (base 3 digit) of the inputs,
in [balanced ternary notation](https://github.com/thirdcoder/balanced-ternary).

The width of the "tryte" (analogous to byte) is set in `tritwise.tryte_size`,
and defaults to 5 trits.

Unary (1-input) operations:

    a NTI(a) STI(a) PTI(a) FD(a) RD(a)
    i   1     1      1      0     i
    0   i     0      1      0     0
    1   i     i      i      1     0

Simple ternary inverter (STI) inverts 1/i and keeps 0,
negative/positive ternary inverter (NTI and PTI) replace 0 with i or 1.
FD and RD are forward and reverse diodes, only allowing 1 or i and
replacing all others with 0. Other unary operations are possible
but STI is the most analogous to binary (base 2) invert (NOT), in that it
negates the sign of the value, and flips all the trits:

    tritwise.STI(33);   // -33
    tritwise.STI(-33);  // 33
    tritwise.PTI(-8);   // 119
    tritwise.FD(107);   // 108

Dyadic (2-input) operations:

    TOR(a,b)  prefers 1,0,i (maximum)
    TAND(a,b) prefers i,0,1 (minimum)
    BUT(a,b)  prefers 0,i,1

TOR and TAND are comparable to binary base-2
[OR](https://en.wikipedia.org/wiki/Bitwise_operation#OR) and
[AND](https://en.wikipedia.org/wiki/Bitwise_operation#AND).
Binary OR and AND "prefer" 1,0 or 0,1 from the bitwise inputs,
respectively; similarly, TOR and TAND prefer 1,0,i or i,0,1, respectively.
The output trits always match either of the two inputs. In situations where
zero is preferred, the BUT function can be used to prefer 0,i,1.

References:
[Ternary computing Testebed: 3-Trit Computer Architecture](http://www.scribd.com/doc/78370674/Ternary-Computing-Testbed-3-Trit-Computer-Architecture), Appendix A, Section 4 "Dyadic Functions"
