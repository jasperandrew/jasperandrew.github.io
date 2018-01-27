const docQS = (sel) => document.querySelector(sel);
const removeAll = (arr,e) => {
    let i;
    while((i = arr.indexOf(e)) > -1) arr.splice(i,1);
    return arr;
}

var screen_on = false,
    caps_on = false,
    passwd_mode = false,
    typey_keys = 'graveonetwothreefourfivesixseveneightninezerodashequallbrktrbrktbslshscolnapostcommastopfslshspaceqyj';
    
var about_arr = [
    ['1'],
    ['2'],
    ['3'],
    ['4'],
    ['5'],
    ['6']
];
