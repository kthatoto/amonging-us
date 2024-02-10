interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const calcCollisionStatus = (subject: Obstacle, opposite: Obstacle) => {
  const sTop = subject.y;
  const sBottom = subject.y + subject.height;
  const sLeft = subject.x;
  const sRight = subject.x + subject.width;

  const oTop = opposite.y;
  const oBottom = opposite.y + opposite.height;
  const oLeft = opposite.x;
  const oRight = opposite.x + opposite.width;

  const collisionResult = {
    x: false,
    y: false,
    detail: {
      top: false,
      bottom: false,
      left: false,
      right: false,
    },
  };

  if (sTop <= oBottom && oTop <= sBottom) {
    collisionResult.y = true;
    if (sTop < oTop) collisionResult.detail.bottom = true; // subjectの方が上、下側が衝突
    if (oTop < sTop) collisionResult.detail.top = true; // subjectの方が下、上側が衝突
  }
  if (sLeft <= oRight && oLeft <= sRight) {
    collisionResult.x = true;
    if (sLeft < oLeft) collisionResult.detail.right = true; // subjectの方が左、右側が衝突
    if (oLeft < sLeft) collisionResult.detail.left = true; // subjectの方が右、左側が衝突
  }

  return collisionResult;
};
