/* eslint-disable no-undef */
$(() => {
  let tasks = [];
  let id = 0;
  const btn = $('#mainMarker'); // button
  const getter = document.getElementById('task'); // clicker (get an id)
  const getterWindow = document.getElementById('body');

  // LEFT COUNTER
  function itemsLeft() {
    let count = 0;
    if (tasks.length > 0) {
      tasks.forEach((obj) => {
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
  }
  itemsLeft();

  // HIDE BOTTOMBAR
  function btnCheck() {
    if (tasks.length === 0) {
      $('.main__bottom').addClass('hidden'); $('.main__inputMark').addClass('hidden');
    } else { $('.main__bottom').removeClass('hidden'); $('.main__inputMark').removeClass('hidden'); }
  }
  btnCheck();

  // REBUILD ARR
  function rebuildTasks() {
    tasks.forEach((obj) => {
      if (obj.isChecked) { $(`#list${obj.id}`).remove(); }
    });
    tasks = tasks.filter((obj) => obj.isChecked === false);
  }

  // INPUT TASKS
  $('#taskInput').keyup((event) => {
    const obj = {
      name: $('#taskInput').val(),
      id,
      isChecked: false,

    };

    if ((event.keyCode === 13) && (obj.name !== '')) {
      tasks.push(obj);

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

  // TOGGLE SOLO CHECKBOXES, DELETING SOLO TASKS
  getter.onclick = function toggleOnClick(e) {
    document.getElementById.innerHTML = e.target.id;

    tasks.forEach((obj, index) => {
      if (obj.id === +e.target.id) {
        if (!obj.isChecked) {
          tasks[index].isChecked = true;
          $(`#span${e.target.id}`).toggleClass('active').removeClass('inactive');
        } else {
          tasks[index].isChecked = false;
          $(`#span${e.target.id}`).toggleClass('inactive').removeClass('active');
        }
      }

      if (`button${obj.id}` === e.target.id) {
        tasks[index].status = 'deleted';

        const neededInd = tasks.findIndex((object) => object.status === 'deleted');
        $(`#list${obj.id}`).remove();
        tasks.splice(neededInd, 1);
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
  getterWindow.onclick = function renameOnBlur(e) {
    document.getElementById.innerHTML = e.target.id;
    tasks.forEach((obj) => {
      if (`rewrite${obj.id}` !== e.target.id) {
        $(`#rewrite${obj.id}`).addClass('hidden');
        $(`#${obj.id}`).removeClass('hidden');
        $(`#span${obj.id}`).removeClass('hidden');
      }
    });
    itemsLeft();
    btnCheck();
  };

  // CHECK FUNCTION FOR MARK
  checkitout = function checkItOutMark() {
    let count = 0;

    tasks.forEach((obj) => {
      if (obj.isChecked) { count += 1; }
    });
    if (count === tasks.length) { return true; }
    return false;
  };

  // MARK ALL / UNMARK ALL
  btn.click(() => {
    const e = checkitout();
    if (e) {
      tasks.forEach((obj, index) => {
        $(`#span${obj.id}`).toggleClass('inactive').removeClass('active');
        $(`#${obj.id}`).prop('checked', false);
        tasks[index].isChecked = false;
      });
    } else {
      tasks.forEach((obj, index) => {
        if (!($(`#${obj.id}`).prop('checked'))) {
          $(`#span${obj.id}`).toggleClass('active').removeClass('inactive');
          $(`#${obj.id}`).prop('checked', true);
          tasks[index].isChecked = true;
        }
      });
    }
    btnCheck();
    itemsLeft();
  });

  // FILTERS
  $('.main__filter_active').click(() => {
    tasks.forEach((obj) => {
      if (obj.isChecked) {
        $(`#list${obj.id}`).addClass('hidden');
      } else {
        $(`#list${obj.id}`).removeClass('hidden');
      }
    });
  });
  $('.main__filter_done').click(() => {
    tasks.forEach((obj) => {
      if (!obj.isChecked) {
        $(`#list${obj.id}`).addClass('hidden');
      } else {
        $(`#list${obj.id}`).removeClass('hidden');
      }
    });
  });
  $('.main__filter_all').click(() => {
    tasks.forEach((obj) => {
      $(`#list${obj.id}`).removeClass('hidden');
    });
  });

  // CLEAN COMPLETED TASKS
  $('.main__cleaner').click(() => {
    rebuildTasks();
    btnCheck();
  });

  // RENAME ON DOUBLE CLICK
  getter.ondblclick = (function renaming(e) {
    tasks.forEach((obj, index) => {
      if (`span${obj.id}` === e.target.id || `list${obj.id}` === e.target.id) {
        inputVal = obj.name;
        $(`#rewrite${obj.id}`).removeClass('hidden').val(inputVal);
        $(`#${obj.id}`).addClass('hidden');
        $(`#span${obj.id}`).addClass('hidden');

        $(`#rewrite${obj.id}`).keyup((event) => {
          if ((event.keyCode === 13) && (obj.name !== '')) {
            tasks[index].name = $(`#rewrite${obj.id}`).val();

            $(`#span${obj.id}`).text(obj.name);

            $(`#rewrite${obj.id}`).addClass('hidden');
            $(`#${obj.id}`).removeClass('hidden');
            $(`#span${obj.id}`).removeClass('hidden');
          } else if (event.keyCode === 27) {
            $(`#rewrite${obj.id}`).addClass('hidden');
            $(`#${obj.id}`).removeClass('hidden');
            $(`#span${obj.id}`).removeClass('hidden');
          }
        });
      }
    });
  });

  // BUTTON DELETE HOVER
  getter.onmouseover = (function hoverOne(e) {
    document.getElementById.innerHTML = e.target.id;

    tasks.forEach((obj) => {
      if (`list${obj.id}` === e.target.id || `span${obj.id}` === e.target.id || obj.id === +e.target.id
            || `button${obj.id}` === e.target.id || `rewrite${obj.id}` === e.target.id) {
        $(`#button${obj.id}`).removeClass('hidden');
      }
    });
  });
  getter.onmouseout = (function hoverTwo(e) {
    document.getElementById.innerHTML = e.target.id;

    tasks.forEach((obj) => {
      if (`list${obj.id}` === e.target.id || `span${obj.id}` === e.target.id || obj.id === +e.target.id
            || `button${obj.id}` === e.target.id || `rewrite${obj.id}` === e.target.id) {
        $(`#button${obj.id}`).addClass('hidden');
      }
    });
  });
});
