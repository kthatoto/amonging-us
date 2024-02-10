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

  const beforeCollisionHorizontal = sLeft < oRight && oLeft < sRight;
  const beforeCollisionVertical = sTop < oBottom && oTop < sBottom;
  const afterCollisionHorizontal = sdLeft <= oRight && oLeft <= sdRight;
  const afterCollisionVertical = sdTop <= oBottom && oTop <= sdBottom;

  const result = {
    x: false,
    y: false,
    restX: 0,
    restY: 0,
    side: {
      top: false,
      bottom: false,
      left: false,
      right: false,
    },
    interactable: false,
  };

  if (afterCollisionVertical) {
    if (sTop < oTop) result.side.bottom = true; // subjectの方が上、下側が衝突
    if (oTop < sTop) result.side.top = true; // subjectの方が下、上側が衝突
  }
  if (afterCollisionHorizontal) {
    if (sLeft < oLeft) result.side.right = true; // subjectの方が左、右側が衝突
    if (oLeft < sLeft) result.side.left = true; // subjectの方が右、左側が衝突
  }

  if (!beforeCollisionVertical && afterCollisionVertical && afterCollisionHorizontal) {
    result.y = true;
    if (result.side.top) result.restY = oBottom - sTop;
    if (result.side.bottom) result.restY = oTop - sBottom;
  }
  if (!beforeCollisionHorizontal && afterCollisionHorizontal && afterCollisionVertical) {
    result.x = true;
    if (result.side.left) result.restX = oRight - sLeft;
    if (result.side.right) result.restX = oLeft - sRight;
  }

  return result;
};
