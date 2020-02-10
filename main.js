interact('.dropzone')
  .dropzone({
    accept: '.small-card',
  })
  // .on('drop', function (event) {
  //   event.target.classList.add('drop-activated')
  // })

interact('.draggable')
  .draggable({

    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'dropzone',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: dropzoneFinal
  })

function dragMoveListener (event) {
  var target = event.target

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
}

function dropzoneFinal(event) {
    console.log(event.target);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
