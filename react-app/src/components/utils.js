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

export async function like(postId) {
  const res = await fetch(`/api/posts/${postId}/likes`);

  if (res.ok) {
    const { like } = await res.json();
    return like;
  } else {
    return false;
  }
}

export async function addLike(postId) {
  const res = await fetch(`/api/likes/${postId}`, { method: "POST" });

  if (res.ok) {
    const like = await res.json();
    return like;
  } else {
    return null;
  }
}

export async function deleteLike(postId) {
  const res = await fetch(`/api/likes/${postId}/delete`, { method: "DELETE" });

  if (res.ok) {
    const isSuccess = await res.json();
    return isSuccess;
  } else {
    return null;
  }
}
