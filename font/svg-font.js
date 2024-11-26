function fixedHex(n, len){
    var str = n.toString(16).toUpperCase();
    while (str.length < len)
        str = "0" + str;
    return str;
}

function unicodeId(str) {
    var result = '';
    for (let i = 0; i < str.length; i++) {
            result += "u" + fixedHex(str.charCodeAt(i), 4);
    }
    return result;
}

const char_grid = `
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
0123456789@#$€%^&*()[]{}<>
_+-=~.,:;?!/|\\'"\`���������
█▓▒░ ↵��������������������
��������������������������
��������������������������
��������������������������
��������������������������
��������������������������
��������������������������
`.trim();

const char_map = {};

let x = 0, y = 0;
let map_str = '';
for (let i = 0; i < char_grid.length; i++) {
    let ch = char_grid[i];
    if (ch === '\n') {
        x = 0;
        y += 1;
        continue;
    }
    char_map[ch] = {id:unicodeId(ch), x:x, y:y};
    x += 1;
}

console.log(char_map);