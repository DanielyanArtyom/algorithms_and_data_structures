/**
 *
 * @param {[{start,end}]} activities
 */

function activitySelection(activities) {
  let count = 1;
  let idx = 0;

  for (let i = 1; i < activities.length; ++i) {
    if (activities[i].start >= activities[idx].end) {
      ++count;
      idx = i;
    }
  }

  return count;
}
