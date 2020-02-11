interact('.dropzone')
  .dropzone({
  })
  .on('drop', function (event) {
    let rowA = document.querySelector('.row-a');
    let rowB = document.querySelector('.row-b');
    let rowAChildren = [...document.querySelector('.row-a').children];
    let rowBChildren = [...document.querySelector('.row-b').children];

    let previousLargeContainer = document.querySelector('.large-card-container');
    let target = event.target;
    let draggedItem = document.querySelector('.drag-active');

      // if you're dragging a large card and staying in same row
      if (target.parentElement === draggedItem.parentElement.parentElement &&
      draggedItem.classList.contains('large-card')) {

      draggedItem.parentNode.appendChild(target.children[0]);
      target.appendChild(draggedItem)
      switchLargeCardWithinRow();
      // if you're dragging a small card and staying in same row
    } else if (target.parentElement === draggedItem.parentElement.parentElement &&
    !draggedItem.classList.contains('large-card')) {
      draggedItem.parentNode.appendChild(target.children[0]);
      target.appendChild(draggedItem)
      // if you're dragging a large card into a different row
    } else if (target.parentElement !== draggedItem.parentElement.parentElement
      && draggedItem.classList.contains('large-card')) {
        switchLargeCardToDifferentRow()
        draggedItem.parentNode.appendChild(target.children[0]);
        target.appendChild(draggedItem)
      }

    function switchLargeCardWithinRow() {
      if (previousLargeContainer.classList.contains('large-card-right')) {

        previousLargeContainer.classList.remove('large-card-right');
        previousLargeContainer.classList.remove('large-card-container');
        previousLargeContainer.classList.add('card-container');

        target.classList.add('large-card-left');
        target.classList.add('large-card-container');
        target.classList.remove('card-container');

      } else if (previousLargeContainer.classList.contains('large-card-left')) {

        target.classList.add('large-card-right');
        target.classList.add('large-card-container');
        target.classList.remove('card-container');

        previousLargeContainer.classList.remove('large-card-left');
        previousLargeContainer.classList.remove('large-card-container');
        previousLargeContainer.classList.add('card-container');
      }
    }

    function switchLargeCardToDifferentRow() {
      previousLargeContainer.classList.remove('large-card-left');
      previousLargeContainer.classList.remove('large-card-right');
      previousLargeContainer.classList.remove('large-card-container');
      previousLargeContainer.classList.add('card-container');
      let targetRow = target.parentNode;

      if (targetRow === rowA) {
        console.log('rowA');
      } else if (targetRow === rowB) {
        if (parseInt(target.dataset.id) === 3) {
          target.classList.add('large-card-left');
          rowA.appendChild(rowBChildren.slice(-1)[0])
          console.log(rowBChildren.slice(-1)[0]);
        } else if (parseInt(target.dataset.id) === 4) {
          target.classList.add('large-card-left');
          rowA.appendChild(rowBChildren.slice(0)[0])
        } else if (parseInt(target.dataset.id) === 5) {
          target.classList.add('large-card-right');
          rowA.appendChild(rowBChildren.slice(0)[0])
        }
      }
      
      target.classList.add('large-card-container');
      target.classList.remove('card-container');
    }

    // if (rowAChildren.length > rowBChildren.length) {
    //   console.log('three in row A');
    // } else {
    //   console.log('three in row B', rowAChildren[-1]);
    // }
    // console.log('target', target.children.length);
    // console.log('item', draggedItem.parentElement.parentElement);
    // console.log('rowA', rowA);
    // console.log('rowB', rowB);

    resetItemCoordinates(draggedItem);
  })

  function resetItemCoordinates(item) {
    item.classList.remove('drag-active');
    item.style.removeProperty('transform');
    item.style.removeProperty('translate');
    item.removeAttribute('data-x');
    item.removeAttribute('data-y');
  }

interact('.draggable')
  .draggable({

    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        // restriction: '.small-card-container',
        // endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: false,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    // onend:
    });

function dragMoveListener (event) {
  var target = event.target
  target.classList.add('drag-active')

  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)

  // return target
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
