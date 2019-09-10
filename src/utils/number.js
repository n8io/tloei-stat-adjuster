import { always, defaultTo, equals, pipe, when } from 'ramda';

export const number = fallback =>
  pipe(
    Number,
    when(equals(0), always(undefined)),
    defaultTo(fallback)
  );
