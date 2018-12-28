window.createDomElement = (tagName, attributes, children) => {
  const el = document.createElement(tagName);
  children.forEach(child => {
    if (typeof child === 'string') {
      el.innerText = child;
    }
  });
  return el;
};

const Hello = title => window.createDomElement('div', {}, ['Hey']);

document.body.appendChild(Hello('Yp Dude'));
