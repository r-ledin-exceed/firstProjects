/* eslint-disable no-undef */
$(() => {
  let arr = [];
  let id = 0;
  const btn = $('#mainMarker');
  const getter = document.getElementById('task');
  const anotherGetter = document.getElementById('body');

  // LEFT COUNTER
  function itemsLeft() {
    let count = 0;
    if (arr.length > 0) {
      arr.forEach((obj) => {
        if (!obj.isChecked) { count += 1; }
        $('#outputField').text(
          `${count} items left`,
        );
      });
    } else {
      $('#outputField').text(
        '0 items left',
      );
    }
    console.log(arr);
  }
  itemsLeft();

  // ENABLE-DISABLE MARKER
  function btnCheck() {
    if (arr.length === 0) {
      $('.main__bottom').addClass('hidden'); $('.main__inputMark').addClass('hidden');
    } else { $('.main__bottom').removeClass('hidden'); $('.main__inputMark').removeClass('hidden'); }
  }
  btnCheck();

  // REBUILD ARR
  function rebuild() {
    arr.forEach((obj) => {
      if (obj.isChecked) { $(`#list${obj.id}`).remove(); }
    });
    arr = arr.filter((obj) => obj.isChecked === false);
  }

  // INPUT
  $('#taskInput').keyup((event) => {
    const obj = {
      name: $('#taskInput').val(),
      id,
      isChecked: false,

    };

    if ((event.keyCode === 13) && (obj.name !== '')) {
      arr.push(obj);

      $('#task').append($(`
            <li class="task__listik" id="list${obj.id}">
            <input type = "text" id="rewrite${obj.id}" class="rewrite hidden">
            <input type="checkbox" id="${obj.id}"/>
            <span id="span${obj.id}" class="inactive onDblClick">${obj.name}</span>
            <button class="hidden" id="button${obj.id}">delete</button></li>
            `));

      id += 1;
      $('#taskInput').val('');
      itemsLeft();
      btnCheck();
    }
  });

  // TOGGLE SOLO CHECKBOXES, CLICK ON DEL BUTT
  getter.onclick = function toggleOnClick(e) {
    document.getElementById.innerHTML = e.target.id;

    arr.forEach((obj, index) => {
      if (obj.id === +e.target.id) {
        if (!obj.isChecked) {
          arr[index].isChecked = true;
          $(`#span${e.target.id}`).toggleClass('active').removeClass('inactive');
        } else {
          arr[index].isChecked = false;
          $(`#span${e.target.id}`).toggleClass('inactive').removeClass('active');
        }
      }

      if (`button${obj.id}` === e.target.id) {
        arr[index].status = 'deleted';

        const neededInd = arr.findIndex((object) => object.status === 'deleted');
        $(`#list${obj.id}`).remove();
        arr.splice(neededInd, 1);
      }

      if (`rewrite${obj.id}` !== e.target.id) {
        $(`#rewrite${obj.id}`).addClass('hidden');
        $(`#${obj.id}`).removeClass('hidden');
        $(`#span${obj.id}`).removeClass('hidden');
      }

    });
    itemsLeft();
    btnCheck();
  };

  // ONBLUR WHILE RENAME
  anotherGetter.onclick = function toggleOnClickSecond(e) {
    document.getElementById.innerHTML = e.target.id;
    arr.forEach((obj, ) => {
    if (`rewrite${obj.id}` !== e.target.id) {
      $(`#rewrite${obj.id}`).addClass('hidden');
      $(`#${obj.id}`).removeClass('hidden');
      $(`#span${obj.id}`).removeClass('hidden');
      }
    });
      itemsLeft();
      btnCheck();
  };

  // ONE MORE CHECKER
  checkitout = function checkItOutMark(e) {
    let count = 0;
    debugger
    arr.forEach(obj => {
      if (obj.isChecked) { count += 1 }
    });
    if (count === arr.length) {return e = true} else {return e = false}     
  };

  // MARKER
  btn.click(() => {
    let e = checkitout();
    debugger
    if (e) {
      arr.forEach((obj, index) => {
        $(`#span${obj.id}`).toggleClass('inactive').removeClass('active');
        $(`#${obj.id}`).prop('checked', false);
        arr[index].isChecked = false;
      });
    } else {
      arr.forEach((obj, index) => {
        if (!($(`#${obj.id}`).prop('checked'))) {
          $(`#span${obj.id}`).toggleClass('active').removeClass('inactive');
          $(`#${obj.id}`).prop('checked', true);
          arr[index].isChecked = true;
        };
      });
    };
    btnCheck();
    itemsLeft();
  });

  // FILTERS
  $('.main__filter_active').click(() => {
    arr.forEach((obj) => {
      if (obj.isChecked) {
        $(`#list${obj.id}`).addClass('hidden');
      } else {
        $(`#list${obj.id}`).removeClass('hidden');
      }
    });
  });
  $('.main__filter_done').click(() => {
    arr.forEach((obj) => {
      if (!obj.isChecked) {
        $(`#list${obj.id}`).addClass('hidden');
      } else {
        $(`#list${obj.id}`).removeClass('hidden');
      }
    });
  });
  $('.main__filter_all').click(() => {
    arr.forEach((obj) => {
      $(`#list${obj.id}`).removeClass('hidden');
    });
  });

  // CLEAN COMPLETED
  $('.main__cleaner').click(() => {
    rebuild();
    btnCheck();
  });

  // RENAME
  getter.ondblclick = (function renaming(e) {
    
    arr.forEach((obj, index) => {
      if (`span${obj.id}` === e.target.id || `list${obj.id}` === e.target.id) {
        inputVal = obj.name;
        $(`#rewrite${obj.id}`).removeClass('hidden').val(inputVal);
        $(`#${obj.id}`).addClass('hidden');
        $(`#span${obj.id}`).addClass('hidden');

        $(`#rewrite${obj.id}`).keyup((event) => {
          if ((event.keyCode === 13) && (obj.name !== '')) {
            arr[index].name = $(`#rewrite${obj.id}`).val();

            $(`#span${obj.id}`).text(obj.name);

            $(`#rewrite${obj.id}`).addClass('hidden');
            $(`#${obj.id}`).removeClass('hidden');
            $(`#span${obj.id}`).removeClass('hidden');
          } else if (event.keyCode === 27) {
            $(`#rewrite${obj.id}`).addClass('hidden');
            $(`#${obj.id}`).removeClass('hidden');
            $(`#span${obj.id}`).removeClass('hidden');
            };
        });

      }
    });
  });

  // BUT DELETE
  getter.onmouseover = (function hoverOne(e) {
    document.getElementById.innerHTML = e.target.id;

    arr.forEach((obj) => {
      if (`list${obj.id}` === e.target.id || `span${obj.id}` === e.target.id || obj.id === +e.target.id
            || `button${obj.id}` === e.target.id || `rewrite${obj.id}` === e.target.id) {
        $(`#button${obj.id}`).removeClass('hidden');
      }
    });
  });
  getter.onmouseout = (function hoverTwo(e) {
    document.getElementById.innerHTML = e.target.id;

    arr.forEach((obj) => {
      if (`list${obj.id}` === e.target.id || `span${obj.id}` === e.target.id || obj.id === +e.target.id
            || `button${obj.id}` === e.target.id || `rewrite${obj.id}` === e.target.id) {
        $(`#button${obj.id}`).addClass('hidden');
      }
    });
  });
});
