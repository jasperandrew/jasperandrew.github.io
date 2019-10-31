const FS_IMPORT = [
    {
        "type": "fold",
        "name": "bin",
        "contents": [
            {
                "type": "text",
                "name": "about",
                "text": 
`shell.print('Hey, I\\'m Jasper.');
return false;`
            },
            {
                "type": "text",
                "name": "cat",
                "text": 
`const file = filesystem.fileFromPath(args[1]);
if(!file){
    shell.error(args[1] + ': does not exist');
    return false;
}
if(file.type === 'fold'){
    shell.error(args[1] + ': is a folder');
    return false;
}
shell.print(file.data);
return true;`
            },
            {
                "type": "text",
                "name": "clear",
                "text": 
`document.querySelector('#readout').innerHTML = '';
return true;`
            },
            {
                "type": "text",
                "name": "contact",
                "text": 
`shell.print([
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
                "type": "text",
                "name": "echo",
                "text": 
`[, ...args] = args;
let str = '';
args.forEach(arg => { str += arg + ' '; });
shell.print(str);
return true;`
            },
            {
                "type": "text",
                "name": "help",
                "text": 
`[, ...args] = args;
shell.print('blah');
args.forEach(arg => {shell.print(arg);});
return true;`
            },
            {
                "type": "text",
                "name": "jasper",
                "text": 
`shell.print(util.jasper_str);
return true;`
            },
            {
                "type": "text",
                "name": "login",
                "text": 
`shell.error('login: program not implemented');
return false;`
            },
            {
                "type": "text",
                "name": "ls",
                "text": 
`for(let f in filesystem.curr_dir.data){
    shell.print(filesystem.curr_dir.data[f].toString());
}`
            },
            {
                "type": "text",
                "name": "pwd",
                "text": `shell.print(filesystem.curr_dir.getPath());`
            },
            {
                "type": "text",
                "name": "resume",
                "text": 
`shell.print('opening in new window...');
window.setTimeout(() => { window.open('http://www.jasperandrew.me/resume.pdf'); }, 500);
return true;`
            },
            {
                "type": "text",
                "name": "welcome",
                "text": 
`shell.print(util.welcome_str);
return true;`
            },
        ]
    },
    {
        "type": "fold",
        "name": "home",
        "contents": [
            {
                "type": "fold",
                "name": "jasper",
                "contents": [
                    {
                        "type": "text",
                        "name": "test",
                        "text": 'blah'
                    }
                ]
            }
        ]
    }
];