import {
  comparator,
  curry,
  drop,
  map,
  multiply,
  pipe,
  reduce,
  sort,
} from 'ramda';

const propLt = curry((name, a, b) => a[name] < b[name]);

function sortByProps(keys, list) {
  const fns = map(
    key =>
      key.charAt(0) === '-'
        ? pipe(
            comparator(propLt(drop(1, key))),
            multiply(-1)
          )
        : comparator(propLt(key)),
    keys
  );

  const sorter = (a, b) => reduce((acc, fn) => acc || fn(a, b), 0, fns);

  return arguments.length === 1 ? sort(sorter) : sort(sorter, list);
};

export { sortByProps };
