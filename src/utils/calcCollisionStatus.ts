interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Diff {
  x: number;
  y: number;
}

export const calcCollisionStatus = (subject: Obstacle, opposite: Obstacle, diff: Diff) => {
  const sTop = subject.y;
  const sBottom = subject.y + subject.height;
  const sLeft = subject.x;
  const sRight = subject.x + subject.width;

  const sdTop = sTop + diff.y;
  const sdBottom = sBottom + diff.y;
  const sdLeft = sLeft + diff.x;
  const sdRight = sRight + diff.x;

  const oTop = opposite.y;
  const oBottom = opposite.y + opposite.height;
  const oLeft = opposite.x;
  const oRight = opposite.x + opposite.width;

  const beforeCollisionHorizontal = sLeft <= oRight && oLeft <= sRight;
  const beforeCollisionVertical = sTop <= oBottom && oTop <= sBottom;
  const afterCollisionHorizontal = sdLeft <= oRight && oLeft <= sdRight;
  const afterCollisionVertical = sdTop <= oBottom && oTop <= sdBottom;

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

  if (!beforeCollisionVertical && afterCollisionVertical && afterCollisionHorizontal) {
    collisionResult.y = true;
  }
  if (!beforeCollisionHorizontal && afterCollisionHorizontal && afterCollisionVertical) {
    collisionResult.x = true;
  }

  if (sTop <= oBottom && oTop <= sBottom) {
    if (sTop < oTop) collisionResult.detail.bottom = true; // subjectの方が上、下側が衝突
    if (oTop < sTop) collisionResult.detail.top = true; // subjectの方が下、上側が衝突
  }
  if (sLeft <= oRight && oLeft <= sRight) {
    if (sLeft < oLeft) collisionResult.detail.right = true; // subjectの方が左、右側が衝突
    if (oLeft < sLeft) collisionResult.detail.left = true; // subjectの方が右、左側が衝突
  }

  return collisionResult;
};
