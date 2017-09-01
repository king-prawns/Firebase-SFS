import R from 'ramda';
import { insertInDom } from './helpers';

// http://buzzdecafe.github.io/code/2014/05/16/introducing-ramda

const userList = [
  { name: 'Paul', amount: 903 },
  { name: 'Mike', amount: 2875654 },
  { name: 'John', amount: 6 }
];

const user1 = { name: 'Paul', amount: 17 };
const user2 = { name: 'Mike', amount: 987 };
const user3 = { name: 'John', amount: 68 };

var name = R.prop('name');
// when I call that function with one argument, I get the result.
var value = name(user1);
insertInDom(`${value}:`, true);

// `prop` takes two arguments. If I just give it one, I get a function back
var amount = R.prop('amount');

// Full function version:
// var moduleBy = function (n) {
//   return function (d) {
//     return d % n;
//   };
// };

// Arrow function version:
var moduleBy = n => d => d % n;

// take an object with an `amount` property
// add one to it
// find its remainder when divided by 7
var amtAdd1Mod7 = R.compose(moduleBy(7), R.add(1), amount());

// we can use that as is:
var user1amtAdd1Mod7 = amtAdd1Mod7(user1); // => 4
insertInDom(user1amtAdd1Mod7);
amtAdd1Mod7(user2); // => 1
amtAdd1Mod7(user3); // => 6


// But we can also use our composed function on a list of objects, e.g. to `map`:
R.map(amtAdd1Mod7, userList); // => [1, 6, 0]

// of course, `map` is also curried, so you can generate a new function
// using `amtAdd1Mod7` that will wait for a list of "userList" to
// get passed in:
var userToValue = R.map(amtAdd1Mod7);
var amounts = userToValue(userList); // => [1, 6, 0]
insertInDom(amounts);
