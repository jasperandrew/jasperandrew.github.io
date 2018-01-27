const removeAll = (arr,x) => {
    let i;
    while((i = arr.indexOf(x)) > -1) arr.splice(i,1);
    return arr;
}
