export function createDiv(num) {
  let arr = [];
  for (let i = 0; i < num; i++) arr.push(<div key={i}></div>);
  return arr;
}
