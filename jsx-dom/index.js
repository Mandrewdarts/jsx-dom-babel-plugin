const { readFileSync } = require('fs');
const { parseChildren } = require('./parseChildren');

const createDomElementString = readFileSync(`${__dirname}/createDomElement.js`);


module.exports = ({ types: t, parse }) => {
    return {
        visitor: {
            Program(path) {
                const createElementFn = parse(createDomElementString).program.body[0];
                path.get('body')[0].insertBefore(createElementFn)
            },
            JSXElement(path, state) {
                const { openingElement, children } = path.node;
                const domTagName = getDomTagName(openingElement)
                console.log(parseChildren(children));
                path.replaceWithSourceString(
                    buildDomElement(domTagName, parseChildren(children))
                );
            },
        }
    };
};

// param: JSXOpeningElement
function getDomTagName(openingElement) {
    return openingElement.name.name;
}

function buildDomElement(tagName, children) {
    return ` window.createDomElement('${tagName}', {}, ${JSON.parse(children)})`
}
