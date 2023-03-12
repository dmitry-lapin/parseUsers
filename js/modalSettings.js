let addUserButton = document.getElementById('addBtn');
addUserButton.addEventListener("click", function(event) {
  if(!addNewForm.value) return;
  getUsers([addNewForm.value], checkHide());
  let myModal = document.getElementById('addNew');
  var modal = bootstrap.Modal.getInstance(myModal);
  modal.toggle();
  let backdrop = document.querySelector('.modal-backdrop');
  backdrop.remove();
})