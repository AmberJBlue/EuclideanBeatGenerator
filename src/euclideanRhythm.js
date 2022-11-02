const euclideanRhythm = (onNotes, totalNotes) => {
    if (onNotes >= totalNotes) {
      let arr = parseInt(totalNotes) > 0 ? new Array(parseInt(totalNotes)) : new Array(1)
      return arr.fill(1)
    } 
    let groups = [];
    for (let i = 0; i < totalNotes; i++) groups.push([Number(i < onNotes)]);
  
    let l;
    while (l = groups.length - 1) {
      let start = 0, first = groups[0];
      while (start < l && compareArrays(first, groups[start])) start++;
      if (start === l) break;
  
      let end = l, last = groups[l];
      while (end > 0 && compareArrays(last, groups[end])) end--;
      if (end === 0) break;
  
      let count = Math.min(start, l - end);
      groups = groups
        .slice(0, count)
        .map(function (group, i) { return group.concat(groups[l - i]); })
        .concat(groups.slice(count, -count));
    }
    return [].concat.apply([], groups);
  };
  
  function compareArrays (a, b) {
    // TODO: optimize
    return JSON.stringify(a) === JSON.stringify(b);
  };

  export default euclideanRhythm