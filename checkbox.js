window.addEventListener("DOMContentLoaded", () => {
  function updateChecks() {
    //check or uncheck everything between index of firstChecked and lastChecked
    //set checked equal to the checked value of firstChecked
    firstChecked = parseInt(firstChecked);
    lastChecked = parseInt(lastChecked);
    if (firstChecked < lastChecked) {
      for (let i = firstChecked + 1; i <= lastChecked - 1; i++) {
        checkboxes[i].checked = checkboxes[firstChecked].checked;
      }
    } else {
      for (let i = firstChecked - 1; i >= lastChecked + 1; i--) {
        checkboxes[i].checked = checkboxes[firstChecked].checked;
      }
    }
    //reset variables
    firstChecked = false;
    lastChecked = false;
  }

  function toggleBulkMenu(toShow) {
    //toShow is a boolean
    //show or hide bulk edit menu
    if (toShow) {
      document.querySelector("form.bulk-edit").classList.remove("hidden");
    } else {
      document.querySelector("form.bulk-edit").classList.add("hidden");
    }
  }

  function handleSelectAll(e) {
    if (e.target.checked) {
      //mark all as checked
      checkboxes.forEach(checkbox => (checkbox.checked = true));
      toggleBulkMenu(true);
    } else {
      //mark all as unchecked
      checkboxes.forEach(checkbox => (checkbox.checked = false));
      toggleBulkMenu(false);
    }
  }

  function getChecked() {
    //return an array of only the checked checkboxes
    const checks = Array.from(checkboxes);
    const checked = checks.filter(check => check.checked);
    return checked;
  }

  function handleCheck(index) {
    return function(e) {
      if (e.target.id !== "select-all") {
        if ((firstChecked === false || lastChecked === false) && !e.shiftKey) {
          firstChecked = index;
        } else if (firstChecked !== false && e.shiftKey) {
          lastChecked = index;
          updateChecks();
        } else {
          return;
        }
      }
      //if there are any checked checkboxes, keep showing the bulk edit menu
      //otherwise, hide it
      toggleBulkMenu(getChecked().length > 0);
    };
  }

  function handleSubmit(e) {
    //don't submit the form now; we need to do things first
    e.preventDefault();
    const form = e.target;
    const select = form.querySelector("select");
    if (select.selectedIndex === 0) {
      window.alert("Please select a valid option.");
      return;
    } else {
      //get checked items
      const checkedItems = getChecked();
      if (
        window.confirm(
          `Do you really want to update ${checkedItems.length} ${
            checkedItems.length > 1 ? " packages" : " package"
          }?`
        )
      ) {
        //add selected items to hidden input for form
        let items = [];
        checkedItems.forEach(check => items.push(check.dataset.key));
        input.setAttribute("value", items);
        e.target.submit();
      }
    }
  }

  //get hidden input
  const input = document.querySelector("#to-update");
  //initialize input value to empty string
  input.setAttribute("value", "");

  //store first checked and last checked elements
  //initialize to false
  let firstChecked = false;
  let lastChecked = false;

  //get select all checkbox
  const selectAll = document.querySelector("#select-all");
  //add event listener
  selectAll.addEventListener("click", handleSelectAll);

  //get all checkboxes
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  //add event listeners
  checkboxes.forEach((checkbox, index) =>
    checkbox.addEventListener("click", handleCheck(index))
  );

  //listen for submit
  document
    .querySelector("form.bulk-edit")
    .addEventListener("submit", handleSubmit);
});
