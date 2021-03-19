function kmp(source, pattern) {
  // 计算table
  let table = new Array(pattern.length).fill(0)
  {
    let startIdx = 1, seekIdx = 0
    while (startIdx < pattern.length) {
      if (pattern[startIdx] === pattern[seekIdx]) {
        ++startIdx, ++seekIdx;
        table[startIdx] = seekIdx
      } else {
        if (seekIdx > 0) {
          seekIdx = table[seekIdx]
        } else {
          ++startIdx
        }
      }
    }
  }

  // 匹配
  {
    let startIdx = 0, seekIdx = 0;
    while (startIdx < source.length) {
      if (pattern[seekIdx] === source[startIdx]) {
        ++startIdx, ++seekIdx;
      } else {
        if (seekIdx > 0) {
          seekIdx = table[seekIdx]
        } else {
          ++startIdx
        }
      }
      if (seekIdx === pattern.length) {
        return true
      }
    }
    return false
  }
}

console.log(kmp("abc", "abc"))