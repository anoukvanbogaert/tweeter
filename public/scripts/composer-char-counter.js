$(document).ready(function() {
  // cursor is in text field ready to go
  console.log($('.counter').text())
  const $input = $('#tweet-text')
  $input.val('').focus();

  // counting down
  const $counter = $('#counter')
  $input.on("input", function() {
    const countingDown = 140 - $input.val().length
    $counter.html(countingDown)

    if (countingDown < 0) {
      // adds this property to my counter
      $counter.attr('class', 'to-red')
    } else {
      $counter.removeAttr('class')
    }
  });
});

// attr - set or add an attribute