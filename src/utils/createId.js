export const createId = () => {
  const arr = [];
  let id = "";
  for (let i = 97; i <= 123; i++) {
    let al = String.fromCharCode(i);
    arr.push(al);
  }
  for (let i = 0; i <= 9; i++) {
    arr.push(i);
  }
  for (let i = 0; i <= 20; i++) {
    id += arr[Math.floor(Math.random(0) * arr.length)];
  }
  return id;
};
