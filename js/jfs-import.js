const JFS_IMPORT = [
    {
        "type": "fldr",
        "name": "bin",
        "contents": [
            {
                "type": "data",
                "name": "about",
                "data": `shell.print('Hey, I\\'m Jasper.');
return false;`
            },
            {
                "type": "data",
                "name": "cat",
                "data": `const file = fs.getFileFromPath(args[1], true);
if(!file){
    shell.error(args[1] + ': does not exist');
    return false;
}

if(file.type.search('fldr') > -1){
    shell.error(args[1] + ': is a folder');
    return false;
}
shell.print(file.getData());
return true;`
            },
            {
                "type": "data",
                "name": "clear",
                "data": `document.querySelector('#readout').innerHTML = '';
return true;`
            },
            {
                "type": "data",
                "name": "contact",
                "data": `shell.print([
    '☎ +1 (831) 334-7779',
    '✉ <a href="mailto:jasper.q.andrew@gmail.com">jasper.q.andrew@gmail.com</a>']);
return true;`
            },
            {
                "type": "link",
                "name": "cv",
                "path": "/bin/resume"
            },
            {
                "type": "data",
                "name": "echo",
                "data": `[, ...args] = args;
let str = '';
args.forEach(arg => { str += arg + ' '; });
shell.print(str);
return true;`
            },
            {
                "type": "data",
                "name": "help",
                "data": `[, ...args] = args;
shell.print('blah');
args.forEach(arg => {shell.print(arg);});
return true;`
            },
            {
                "type": "data",
                "name": "jasper",
                "data": `shell.print(util.jasper_str);
return true;`
            },
            {
                "type": "data",
                "name": "login",
                "data": `shell.error('login: program not implemented');
return false;`
            },
            {
                "type": "data",
                "name": "ls",
                "data": `const cur = fs.getCurDir().getData();
let sortable = [];
for(let f in cur) sortable.push(cur[f]);
sortable.sort((a,b) => a.getName().localeCompare(b.getName()));
for(let i in sortable) shell.print(sortable[i].toString());`
            },
            {
                "type": "data",
                "name": "pwd",
                "data": `shell.print(fs.getCurDir().getPath());`
            },
            {
                "type": "data",
                "name": "resume",
                "data": `shell.print('opening in new window...');
window.setTimeout(() => { window.open('http://www.jasperandrew.me/resume.pdf'); }, 500);
return true;`
            },
            {
                "type": "data",
                "name": "rm",
                "data": ``
            },
            {
                "type": "data",
                "name": "touch",
                "data": `if(!args[1]){
    shell.error('touch: no filepath provided');
    return false;
}
const fp = new JPath(args[1]);
if(!fs.isValidPath(fp.toString())){
    fp.up();
    if(!fs.isValidPath(fp.toString())){
        shell.error('touch: ' + fp.toString() + ' does not exist');
        return false;
    }
    fs.getFileFromPath(fp.toString()).addFile(new FSFile(fp.getLeaf(), 'data', null));
}
return true;`
            },
            {
                "type": "data",
                "name": "welcome",
                "data": `shell.print(util.welcome_str);
return true;`
            },
        ]
    },
    {
        "type": "fldr",
        "name": "home",
        "contents": [
            {
                "type": "fldr",
                "name": "jasper",
                "contents": [
                    {
                        "type": "data",
                        "name": "test",
                        "data": "blah"
                    },
                    {
                        "type": "link",
                        "name": "lonk",
                        "path": "fodor/lunk"
                    },
                    {
                        "type": "fldr",
                        "name": "fodor",
                        "contents": [
                            {
                                "type": "data",
                                "name": "toast",
                                "data": "toasty"
                            },
                            {
                                "type": "link",
                                "name": "lunk",
                                "path": "/home"
                            }        
                        ]
                    }        
                ]
            }
        ]
    }
];