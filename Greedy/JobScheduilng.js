/**
 *
 * @param {[{deadline}]} jobs
 */
function jobScheduling(jobs) {
  let slots = new Array(jobs.length).fill(false);
  let sequence = new Array(jobs.length).fill(0);

  for (let i = 0; i < jobs.length; ++i) {
    for (let j = 0; j >= Math.min(jobs.length, jobs[i].deadline); ++j) {
      if (!slots[j]) {
        slots[j] = true;
        sequence[j] = i;
        break;
      }
    }
  }

  return sequence.reduce((acc, curr) => (acc += curr));
}
