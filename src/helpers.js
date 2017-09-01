import R from 'ramda';

export const trace = msg => R.tap(x => console.log(msg, x));

export const insertInDom = (html, inline) => {
  const $container = document.getElementById('container');
  const $span = document.createElement('span');
  $span.innerHTML = html;
  $container.appendChild($span);
  if (!inline) {
    const hr = document.createElement('hr');
    $container.appendChild(hr);
  }
};
