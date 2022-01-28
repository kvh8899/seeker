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

export function traversal(value = 0, comment, arr = []) {
  arr.push([value, comment, comment.replies.length > 5 ? false : true]);
  if (!comment.replies.length) return arr;

  for (let i = 0; i < comment.replies.length; i++) {
    comment.replies[i].parent = comment;
    arr = traversal(value + 1, comment.replies[i], arr);
  }
  return arr;
}

export function getPath(object) {
  let path = [];
  while (object.parent) {
    path.push(`${object.parent.id}`);
    object = object.parent;
  }
  return path;
}

export function findReply(comments, id) {
  for (let i = 0; i < comments.length; i++) {
    let queue = [comments[i]];
    while (queue.length > 0) {
      let curr = queue.shift();
      if (curr.id === id) {
        return curr;
      }
      for (let i = 0; i < curr.replies.length; i++) {
        queue.push(curr.replies[i]);
      }
    }
  }

  return {};
}

//comment: comment obj
// children: children array
//returns an array of ints (id's of children)
export function getChildren(comment, children = [], parentId) {
  children.push(comment.id);
  if (!comment.replies.length) return children;
  for (let i = 0; i < comment.replies.length; i++) {
    children = getChildren(comment.replies[i], children);
  }
  return children;
}

export function hide(comment) {
  document.querySelectorAll(`#com${comment.id}`).forEach((e) => {
    e.classList.add("noThread");
  });
  document.querySelectorAll(`#tab${comment.id}`).forEach((e) => {
    e.classList.add("noThread");
  });
  if (!comment.replies.length) return;

  for (let i = 0; i < comment.replies.length; i++) {
    hide(comment.replies[i]);
  }
}

export function reRenderThread(comment, map, value = 0) {
  if (value === 0) {
    map[`com${comment.id}`] = true;
  }

  if (map[`com${comment.id}`] || value === 0) {
    document.querySelectorAll(`#com${comment.id}`).forEach((e) => {
      e.classList.remove("noThread");
    });
    document.querySelectorAll(`#tab${comment.id}`).forEach((e) => {
      e.classList.remove("noThread");
    });
  } else {
    document.querySelector(`#com${comment.id}`).classList.remove("noThread");
    document.querySelector(`#bcom${comment.id}`).classList.remove("noThread");
    return;
  }
  if (!comment.replies.length) return;

  for (let i = 0; i < comment.replies.length; i++) {
    reRenderThread(comment.replies[i], map, value + 1);
  }
}

export function hideMany(comment, map, value = 0) {
  if (map[`com${comment.id}`]) {
    return;
  }
  if (value !== 0) {
    document.querySelectorAll(`#com${comment.id}`).forEach((e) => {
      e.classList.add("noThread");
    });
  } else {
    document.querySelectorAll(`#com${comment.id}`).forEach((e) => {
      e.classList.add("noThread");
    });
    document.querySelector(`.comTop${comment.id}`).classList.remove("noThread");
    document.querySelector(`#bcom${comment.id}`).classList.remove("noThread");
    
  }

  document.querySelectorAll(`#tab${comment.id}`).forEach((e) => {
    e.classList.add("noThread");
  });
  if (!comment.replies.length) return;

  for (let i = 0; i < comment.replies.length; i++) {
    hide(comment.replies[i], map, value);
  }
}
