export function extractDate(str) {
  const day = str.match(/ \d\d /);
  const month = str.match(/ \w{3} /);
  const year = str.match(/ \d{4} /);
  return `${month.join().trim()} ${day.join().trim()}, ${year.join().trim()} `;
}

export function cap(str) {
  return <>{str ? str[0].toUpperCase() + str.slice(1) : ""}</>;
}

export function subString(str, currPage) {
  if (!currPage) return;
  str = str.toLowerCase();
  let curr = currPage.toLowerCase();
  return str.indexOf(curr) > -1 ? true : false;
}