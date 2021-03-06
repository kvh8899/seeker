export function extractDate(str) {
  const day = str.match(/ \d\d /);
  const month = str.match(/ \w{3} /);
  const year = str.match(/ \d{4} /);
  return `${month.join().trim()} ${day.join().trim()}, ${year.join().trim()} `;
}

export function formatDate(str) {
  let postedDate = new Date(str);
  let now = Date.now();
  let time = (now - postedDate) * 0.001;
  let unit = " seconds";
  if (time > 60) {
    time = time / 60;
    unit = " minutes";
    if (time > 60) {
      time = time / 60;
      unit = " hours";
      if (time > 24) {
        time = time / 24;
        unit = " days";
        if (time > 30) {
          time = time / 30;
          unit = " months";
          if (time >= 12) {
            time = time / 12;
            unit = " years";
          }
        }
      }
    }
  }
  return Math.floor(time) + unit + " ago";
}

export function cap(str) {
  return <>{str ? str[0].toUpperCase() + str.slice(1) : ""}</>;
}

/*
  for filtering communities by title
*/
export function subString(title, currTitle) {
  if (!currTitle) return;
  title = title.toLowerCase();
  let curr = currTitle.toLowerCase();
  return title.indexOf(curr) > -1 ? true : false;
}

/*
  input: comment object
  returns: a arr of comments to be rendered
  in order of the DFS performed containing
  value: level of the comment in the tree
  comment: the comment obj
*/
export function traversal(value = 0, comment, arr = []) {
  arr.push([
    value,
    comment,
    localStorage.getItem(`com${comment.id}`) === "" ? "" : true,
  ]);
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

/*
  comments: arr of comments
  id: integer of comment trying to find
  returns a comment that has the input id
*/
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

/*
  comment: comment obj
  children: children array
  returns an array of ints (id's of children)
*/
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

/*
    1. find children of current tree and toggle class noThread of
    2. all childrens unless it is false in map, then do not display
    comment
    3. set e.id in map to true
 */
export function reRenderThread(comment, map, value = 0) {
  if (value === 0) {
    map[`com${comment.id}`] = true;
  }
  if (map.getItem(`com${comment.id}`)) {
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

/*

  1. find children of id at path[level - x - 1]
  2. set that id in map to false
  3. hide all of the children (lol)

  map keeps track of which threads were closed and which were open,
  so threads that were closed will remain closed when opening an 
  ancestor thread

  postComments:Comments adjacency list
  path: id of ancestor
  e: current comment data
*/
export function toggleClasses(postComments, path, e) {
  let child = findReply(postComments, parseInt(path));
  let children = getChildren(child);
  children.forEach((exex) => {
    //unsure if userefs should be used here
    document.querySelectorAll(`#com${exex}`).forEach((e) => {
      e.classList.add("noThread");
    });
    document.querySelectorAll(`#tab${exex}`).forEach((e) => {
      e.classList.add("noThread");
      e.classList.add("greyTab");
      e.classList.remove("orangeTab");
    });
  });
  document.querySelector(`.comTop${path}`).classList.remove("noThread");
  document.querySelector(`#bcom${path}`).classList.remove("noThread");
  document.querySelector(`#com${e.id}`).classList.add("noThread");
}

/*
  level: current level of the comment in the tree
  path: ids of ancestor comments
  postComments: list of comments
  e:current comment
*/
export function levels(level, path, postComments, e) {
  let arr = [];
  for (let x = 0; x < level; x++) {
    arr.push(
      <div
        className="tab greyTab"
        key={Math.random()}
        id={`tab${path[level - x - 1]}`}
        onClick={(ex) => {
          localStorage.setItem(`com${path[level - x - 1]}`, "");
          toggleClasses(postComments, path[level - x - 1], e);
          document
            .querySelector(`#pp${path[level - x - 1]}`)
            .classList.add("move");
        }}
      ></div>
    );
  }
  return arr;
}

export function hideMany(comment, map, value = 0) {
  document.querySelectorAll(`#com${comment.id}`).forEach((e) => {
    e.classList.add("noThread");
  });
  document.querySelectorAll(`#tab${comment.id}`).forEach((e) => {
    e.classList.add("noThread");
  });

  if (!comment.replies.length) return;

  for (let i = 0; i < comment.replies.length; i++) {
    hideMany(comment.replies[i], map, value);
  }
}

/*
  removes event listeners to be called when component unmounts
*/
function removeListenerFromThread(allTab, tabHover, tabLeave) {
  return () =>
    allTab.forEach((e) => {
      e.removeEventListener("mouseenter", tabHover);
      e.removeEventListener("mouseleave", tabLeave);
    });
}

/*
  allTab: array of elements that are the threadlines 
          of a specific comment
  purpose: when hovering over a threadline, this function makes
           it turn orange if hovered, grey if not
  returns: a function that removes event listener, to be called
           when component unmounts to prevent memory leak
*/
export function addListenerToThread(e) {
  let allTab = document.querySelectorAll(`#tab${e.id}`);
  function tabLeave() {
    allTab.forEach((e) => {
      e.classList.remove("orangeTab");
      e.classList.add("greyTab");
    });
  }
  function tabHover() {
    allTab.forEach((e) => {
      e.classList.add("orangeTab");
      e.classList.remove("greyTab");
    });
  }
  allTab.forEach((e) => {
    e.addEventListener("mouseenter", tabHover);
    e.addEventListener("mouseleave", tabLeave);
  });
  return removeListenerFromThread(allTab, tabHover, tabLeave);
}

/*
  CommentContainer: CommentContainer component
  postComments: adjacency list of comments and replies
  returns: array of comment components
*/
export function render_Comments(postComments, CommentContainer) {
  let arr = [];
  postComments?.forEach((e) => {
    let data = traversal(0, e, []);
    data.forEach((e) => {
      let path = getPath(e[1]);
      arr.push(
        <CommentContainer
          e={e[1]}
          level={e[0]}
          path={path}
          isOpen={e[2]}
          key={Math.random()}
        ></CommentContainer>
      );
      localStorage.setItem(`com${e[1].id}`, e[2]);
    });
  });
  return arr;
}
