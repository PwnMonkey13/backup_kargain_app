const fs = require('fs');
const path = require('path');

const rootPackage = require(path.resolve(__dirname, '../', 'package.json'));
let functionsPackage = require(path.resolve(__dirname, 'package.json'));
const distPackagePath = path.resolve(__dirname, '../dist', 'package.json');

if(!functionsPackage) functionsPackage = {}
if(!functionsPackage.dependencies) functionsPackage.dependencies = {};
if(!functionsPackage.engines) functionsPackage.engines = { node : '8' }

if(rootPackage && functionsPackage){
    functionsPackage.dependencies = {
        ...functionsPackage.dependencies,
        ...rootPackage.dependencies
    }

    fs.writeFile(distPackagePath, JSON.stringify(functionsPackage,null, 4), (err) => {
        if (err) return console.error(err);
    });
}
