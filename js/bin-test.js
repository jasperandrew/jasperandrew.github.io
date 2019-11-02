const BIN_TEST = {///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
about(){/////////////////////////////////////////////////////////////
shell.print('Hey, I\'m Jasper.');
return false;
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
cat(){///////////////////////////////////////////////////////////////
const file = filesystem.resolveFileFromPath(args[1]);
if(!file){
    shell.error(args[1] + ': does not exist');
    return false;
}

if(file.type === 'fold'){
    shell.error(args[1] + ': is a folder');
    return false;
}
shell.print(file.getData());
return true;
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
contact(){///////////////////////////////////////////////////////////
shell.print([
    '☎ +1 (831) 334-7779',
    '✉ <a href="mailto:jasper.q.andrew@gmail.com">jasper.q.andrew@gmail.com</a>']);
return true;
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
echo(){//////////////////////////////////////////////////////////////
[, ...args] = args;
let str = '';
args.forEach(arg => { str += arg + ' '; });
shell.print(str);
return true;
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
help(){//////////////////////////////////////////////////////////////
[, ...args] = args;
shell.print('blah');
args.forEach(arg => {shell.print(arg);});
return true;
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
jasper(){////////////////////////////////////////////////////////////
shell.print(util.jasper_str);
return true;
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
login(){/////////////////////////////////////////////////////////////
shell.error('login: program not implemented');
return false;
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
ls(){////////////////////////////////////////////////////////////////
const curr = filesystem.curr_dir.getData();
let sortable = [];
for(let f in curr) sortable.push(curr[f]);
sortable.sort((a,b) => a.name.localeCompare(b.name));
for(let i in sortable) shell.print(sortable[i].toString());
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
pwd(){///////////////////////////////////////////////////////////////
shell.print(filesystem.curr_dir.getPath());
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
resume(){////////////////////////////////////////////////////////////
shell.print('opening in new window...');
window.setTimeout(() => { window.open('http://www.jasperandrew.me/resume.pdf'); }, 500);
return true;
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
welcome(){///////////////////////////////////////////////////////////
shell.print(util.welcome_str);
return true;
},///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
}////////////////////////////////////////////////////////////////////

