const Num = 466321;

function decToHexa(Num) {
  var quotient;
  var reste = [];
  var resteHexa = [];
  do {
    quotient = Math.floor(Num / 16);
    reste.push(Num % 16);
    Num = quotient;
  } while (quotient > 0);
  if (reste.length % 2 == 1) {
    reste.push(0);
  }

  for (i = 0; i < reste.length; i++) {
    switch (reste[i]) {
      case 10:
        resteHexa.push('a');
        break;
      case 11:
        resteHexa.push('b');
        break;
      case 12:
        resteHexa.push('c');
        break;
      case 13:
        resteHexa.push('d');
        break;
      case 14:
        resteHexa.push('e');
        break;
      case 15:
        resteHexa.push('f');
        break;
      default:
        resteHexa.push(reste[i]);
    }
  }

  return resteHexa;
}
function hexaToBigEndian(hexaArray) {
  BigEndian = '0x';
  for (i = 1; i < hexaArray.length; ) {
    BigEndian = BigEndian.concat(
      hexaArray[hexaArray.length - i],
      hexaArray[hexaArray.length - i - 1]
    );
    i = i + 2;
  }
  return BigEndian;
}

function hexaToLittleEndian(hexaArray) {
  LittleEndian = '0x';
  for (i = 1; i < hexaArray.length; ) {
    LittleEndian = LittleEndian.concat(hexaArray[i], hexaArray[i - 1]);
    i = i + 2;
  }
  return LittleEndian;
}
function toVarlittleEndian(LittleEndian) {
  const octets = (LittleEndian.length - 2) / 2;
  var varLittleEndian = '';
  switch (octets) {
    case 1:
      varLittleEndian = '0xfd' + LittleEndian.slice(2) + '00';
      break;
    case 2:
      varLittleEndian = '0xfd' + LittleEndian.slice(2);
      break;
    case 3:
      varLittleEndian = '0xfe' + LittleEndian.slice(2) + '00';
      break;
    case 4:
      varLittleEndian = '0xfe' + LittleEndian.slice(2);
      break;
    case 5:
      varLittleEndian = '0xff' + LittleEndian.slice(2) + '000000';
      break;
    case 6:
      varLittleEndian = '0xff' + LittleEndian.slice(2) + '0000';
      break;
    case 7:
      varLittleEndian = '0xff' + LittleEndian.slice(2) + '00';
      break;
    case 8:
      varLittleEndian = '0xff' + LittleEndian.slice(2);
      break;
  }
  return varLittleEndian;
}

console.log(hexaToBigEndian(decToHexa(Num)));
console.log(hexaToLittleEndian(decToHexa(Num)));
console.log(toVarlittleEndian(hexaToLittleEndian(decToHexa(Num))));
