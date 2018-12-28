const childrenMap = {
    'JSXText': (child) => {
        return child.value.trim();
    }
}

module.exports = {
    parseChildren(children) {
        return children.map(child => childrenMap[child.type](child));
    }
}