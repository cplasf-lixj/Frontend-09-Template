
function getStyle(element) {
  if (!element.style) {
    element.style = {}
  }
  for (let prop in element.computedStyle) {
    var p = element.computedStyle.value
    element.style[prop] = element.computedStyle[prop].value

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }
    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }
  }
  return element.style
}

function layout(element) {
  if (!element.computedStyle) {
    return
  }
  var elementStyle = getStyle(element)

  if (elementStyle.display !== 'flex') {
    return
  }

  var items = element.children.filter(e => e.typy === 'element')
  items.sort(function (a, b) {
    return (a.order || 0) - (b.order || 0)
  })

  var style = elementStyle

  ['width', 'height'].forEach(size => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null
    }
  })

  if (!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row'
  } else if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch'
  } else if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start'
  } else if (!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap'
  } else if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch'
  }

  var mainSize, mainStart, mainEnd, mainSign, mainBase,
    crossSize, crossStart, crossEnd, crossSign, crossBase;

  if (style.flexDirection === 'row') {
    mainSize = 'width';
    mainStart = 'left';
    mainEnd = "right";
    mainSign = +1;
    mianBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  } else if (style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = "left";
    mainSign = -1;
    mianBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  } else if (style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  } else if (style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  if (style.flexWrap === 'wrap-reverse') {
    var tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  var isAutoMainSize = false;
  if (!style[mainSize]) {
    elementStyle[mainSize] = 0;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemStyle = getStyle(item)
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize]
      }
    }
    isAutoMainSize = true;
  }

  var flexLine = []
  var flexLines = [flexLine]

  var mainSpace = elementStyle[mainSize];
  var crossSpace = 0;

  for (var i = 0; i < items.length; i++) {
    var item = items[i]
    var itemStyle = getStyle(item)

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0
    }

    if (itemStyle.flex) {
      flexLine.push[item]
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= items[mainSize]
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      flexLine.push(item)
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize]
      }
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [item]
        flexLines.push(flexLine)
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item)
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }
      mainSpace -= itemStyle[mainSize]
    }
  }
  flexLine.mainSpace = mainSpace

  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace
  } else {
    flexLine.crossSpace = crossSpace
  }

  if (mainSpace < 0) {
    var scale = style[mainSize] / (style[mainSize] - mainSpace);
    var currentMain = mainBase;
    for (var i = 0; i < items.length; i++) {
      let item = items[i]
      var itemStyle = getStyle[item]

      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }

      itemStyle[mainSize] = itemStyle[mainSize] * scale;

      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd]
    }
  } else {
    flexLines.forEach(function (items) {
      var mainSpace = items.mainSpace;
      var flexTotal = 0;
      for (var i = 0; items.length; i++) {
        var item = items[i];
        var itemStyle = getStyle[item]

        if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }

      if (flexTotal > 0) {
        var currentMain = mainBase;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var itemStyle = getStyle[item]

          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }
          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currentMain = itemStyle[mainSize]
        }
      } else {
        var step = 0
        if (style.justifyContent === 'flex-start') {
          var currentMain = mainBase;
        }
        if (style.justifyContent === 'flex-end') {
          var currentMain = mainBase + mainSpace * mainSign;
        }
        if (style.justifyContent === 'center') {
          var currentMain = mainSpace / 2 * mainSign + mainBase;
        }
        if (style.justifyContent === 'space-between') {
          step = mainSpace / (items.length - 1) * mainSign;
          var currentMain = mainBase;
        }
        if (style.justifyContent === 'space-around') {
          step = mainSpace / items.length * mainSign;
          var currentMain = step / 2 + mainBase;
        }
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currentMain = itemStyle[mainEnd] * step
        }
      }
    })
  }

  // compute the cross axis sizes
  // align-items, align-self
  var crossSpace;     // compute cross remain space
  if (!style[crossSize]) {    // auto sizing
    crossSpace = 0;
    elementStyle[crossSize] = 0;
    for (var i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize]
    for (var i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }
  // 计算布局的起始点
  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }

  // 根据不同的布局属性，分配剩余空间
  var lineSize = style[crossSize] / flexLines.length;
  var step = 0;
  if (style.alignContent === 'flex-start') {
    crossBase += 0;
  }
  if (style.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace;
  }
  if (style.alignContent === 'center') {
    crossBase += crossSign * crossSpace / 2;
  }
  if (style.alignContent === 'space-between') {
    crossBase += 0;
    step = crossSpace / (flexLines.length - 1)
  }
  if (style.alignContent === 'space-around') {
    step = crossSpace / (flexLines.length)
    crossBase += crossSign * step / 2;
  }
  if (style.alignContent === 'stretch') {
    crossBase += 0
    step = 0
  }
  flexLines.forEach(function (items) {
    var lineCrossSize = style.alignContent === 'stretch' ?
      item.crossSpace + crossSpace / flexLines :
      items.crossSpace;
    for (var i = 0; i < items.length; i++) {
      var item = items[i]
      var itemStyle = getStyle(item)

      var align = itemStyle.alignSelf || style.alignItems;

      if (null === item) {
        itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0
      }
      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize]
      }
      if (align === 'flex-end') {
        itemStyle[crossStart] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossEnd] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
      }
      if (align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize]
      }
      if (align === 'stretch') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) ? itemStyle[crossSize] : 0)

        itemStyle[crossSize] = crossSign * (itemStyle[crossSize])
      }
    }
    crossBase += crossSign * (lineCrossSize + step)
  })
}

module.exports = layout;