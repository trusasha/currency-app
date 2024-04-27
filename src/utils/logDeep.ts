/**
 * Logs each argument to the console. Objects are logged in a pretty-print format.
 * Other types of values are logged as-is. Useful for debugging purposes.
 *
 * @param {...unknown[]} args - A list of arguments of any type to log. Each argument
 *                               is logged on a new line. Objects are stringified with
 *                               indentation for better readability.
 */
export function logDeep(...args: unknown[]) {
  args.forEach(arg => {
    if (typeof arg === 'object' && arg !== null) {
      console.log(`\n${JSON.stringify(arg, null, '\t')}`);
    } else {
      console.log(arg);
    }
  });
  console.log(`------END------\n`);
}
