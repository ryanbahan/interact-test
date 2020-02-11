interact('.dropzone')
  .dropzone({
  })
  .on('drop', function (event) {
    let previousLargeContainer = document.querySelector('.large-card-container');
    // event.target.classList.add('target')
    let target = event.target;
    let dropzoneTarget = parseInt(target.dataset.id)
    let item = document.querySelector('.drag-active');

    if (target.parentElement.children.length === 2) {
      addCard();
    } else {
      // console.log(target);
      pushCardFromRow(dropzoneTarget);
      addCard();
    }

        // console.log(item.parentElement.parentElement);
      function addCard() {
        if (item.classList.contains('large-card')) {
          previousLargeContainer.classList.remove('large-card-right');
          previousLargeContainer.classList.remove('large-card-left');
          previousLargeContainer.classList.remove('large-card-container');
          previousLargeContainer.classList.add('card-container');
          target.classList.add('large-card-container');
        }
        if (target.children.length < 1) {
          target.appendChild(item);
        }
        if (dropzoneTarget === 1 && item.classList.contains('large-card')) {
          target.classList.add('large-card-left')
        } else if (dropzoneTarget === 2 && item.classList.contains('large-card')) {
          target.classList.add('large-card-right')
        } else if (dropzoneTarget === 3 && item.classList.contains('large-card')) {
          target.classList.add('large-card-left')
        } else if (dropzoneTarget === 4 && item.classList.contains('large-card')) {
          target.classList.add('large-card-left')
        } else if (dropzoneTarget === 5 && item.classList.contains('large-card')) {
          target.classList.add('large-card-right')
        }
      }



      function pushCardFromRow(id) {
        if (item.classList.contains('large-card')) {
          let newRow = item.parentElement.parentElement;
          if (id === 3) {
            // console.log(newRow);
            let pushedItem = document.querySelector('[data-id="1"]');
            newRow.appendChild(pushedItem);
          } else {
            let pushedItem = document.querySelector('[data-id="3"]');
            newRow.appendChild(pushedItem);
            // console.log(pushedItem);
          }
        }
      }

    // if (dropzoneTarget === 1 && item.classList.contains('large-card')) {
    //   target.classList.add('large-card-left')
    // } else if (dropzoneTarget === 2 && item.classList.contains('large-card')) {
    //   target.classList.add('large-card-right')
    // } else if (dropzoneTarget === 3 && item.classList.contains('large-card')) {
    //   target.classList.add('large-card-left')
    // } else if (dropzoneTarget === 4 && item.classList.contains('large-card')) {
    //   target.classList.add('large-card-right')
    // } else if (dropzoneTarget === 5 && item.classList.contains('large-card')) {
    //   target.classList.add('large-card-right')
    // }

    item.classList.remove('drag-active');
    item.style.removeProperty('transform');
    item.style.removeProperty('translate');
    item.removeAttribute('data-x');
    item.removeAttribute('data-y');
    // target.classList.remove('target');

    // console.log('item', dropzoneTarget);
    // console.log('previous large container', previousLargeContainer);
  })

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
