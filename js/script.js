//GLOBAL VARIABLES
  let selectedNames = []; //usernames that was entered in input and proceed.
  let selectedObjects = [];
  let renderedUsers = [];

  function parsedUser(user) {
    selectedObjects.push(user)
  };


  function displayUser() {
    const usersList = document.getElementById('usersList');
    for(let user of selectedObjects) {
      if(!selectedNames.includes(user.login)) continue;
      const fragment = document.createDocumentFragment();
      
      const userDiv = document.createElement('div');
      userDiv.classList.add('m-3','col-2', 'd-flex', 'align-items-center', 'justify-content-between', 'userCard', 'flex-column');
      
      const userImage = document.createElement('img');
      [userImage.src, userImage.alt] = [user.avatar_url, `${user.login} picture`];
      userImage.classList.add('img-fluid')
      
      const userId = document.createElement('p');
      userId.textContent = `@${user.login}`;
      userId.classList.add('text-dark', 'fs-5', 'userId', 'text-center')
      
      const userName = document.createElement('h3');
      userName.classList.add('text-center')
      userName.append(user.name)
      
      const userDescription = document.createElement('p');
      userDescription.classList.add('text-center', 'mt-4');
      userDescription.append(user.bio)
      
      const detailsButton = document.createElement('button');
      detailsButton.type = 'button';
      detailsButton.classList.add('btn', 'text-white', 'fs-4', 'fs-bold', 'mt-3', 'detailsBtn', 'w-100');
      const detailsText = document.createElement('p');
      detailsText.textContent = 'Details';
      detailsButton.append(detailsText)
      
      userDiv.append(userImage, userName, userId, userDescription, detailsButton);
      
      fragment.append(userDiv); 
      usersList.append(fragment);
    }
    
    
    /*if(checkHide) {
      user = Object.fromEntries(
        Object.entries(user)
        .filter(([key, value]) => value != null && value.length > 0)
        );
      }*/
      
    }
    
    
    
    async function getUsers() {
      
      for (const user of selectedNames) {
        const url = `https://api.github.com/users/${user}`;
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            parsedUser(data);
          } else {
            throw new Error('Response was not okay. Probably the username was incorrect. Try again.');
          }
        } catch (error) {
          alert(error);
        }
      }
    }
    
    function checkHide() {
      return document.getElementById('hideCheckbox').checked;
    }
    
    const searchAction = document.getElementById('searchAction');
    searchAction.addEventListener('click', () => {
      
      selectedNames = [];
      selectedNames = document.getElementById('usersField').value.replaceAll(' ', '').split(',');
      selectedNames = selectedNames.filter(item => !renderedUsers.includes(item));
      selectedNames.forEach(item => renderedUsers.push(item));
      getUsers().then(() => {
        displayUser();
      }).then(() => { 
        let usersField = document.getElementById('usersField');
        usersField.value = ''; 
      });
    });
  
  function createDetailedUser(selectedUser) { 
    const user = selectedObjects.find(item => item.login === selectedUser.slice(1))
    const generalData = [user.avatar_url, user.login, user.bio, user.public_repos, user.location, user.id, user.created_at, user.updated_at, user.followers];

    const userWithoutGeneralData = Object.entries(user)
  .filter(([key, value]) => !generalData.includes(value))
  .map(([key, value]) => `<p class="fs-5"><span class="fw-bold">${key}:</span> ${value}</p>`)
  .join('');
    const userTemplate = `<div class="row justify-content-around">
    <div class="col-5 d-flex">
    <img src="${user.avatar_url}" alt="userAvatar" class="rounded detailedImage">
    </div>
    <div class="col-6 px-4">
    <h1 class="text-center mb-3">${user.login}</h1>
    
    <figure class="text-center mb-4">
    <blockquote class="blockquote">
    <p>${user.bio}</p>
    </blockquote>
    <figcaption class="blockquote-footer">
    bio</cite>
    </figcaption>
    </figure>
    
    <ul class="list-group list-group-horizontal d-flex justify-content-between">
    <li class="list-group-item fieldName fw-bold fs-3 px-0">Public repositories: </li>
    <li class="list-group-item fieldValue fs-3 px-0">${user.public_repos}</li>
    </ul>
    <ul class="list-group list-group-horizontal-sm d-flex justify-content-between">
    <li class="list-group-item fw-bold fs-3 px-0">Location: </li>
    <li class="list-group-item fieldValue fs-3 px-0">${user.location}</li>
    </ul>
    <ul class="list-group list-group-horizontal-sm d-flex justify-content-between">
    <li class="list-group-item fw-bold fs-3 px-0">Id: </li>
    <li class="list-group-item fieldValue fs-3 px-0">${user.id}</li>
    </ul>
    <ul class="list-group list-group-horizontal-sm d-flex justify-content-between">
    <li class="list-group-item fw-bold fs-3 px-0">Created: </li>
    <li class="list-group-item fieldValue fs-3 px-0">${user.created_at}</li>
    </ul>
    <ul class="list-group list-group-horizontal-sm d-flex justify-content-between">
    <li class="list-group-item fw-bold fs-3 px-0">Updated: </li>
    <li class="list-group-item fieldValue fs-3 px-0">${user.updated_at}</li>
    </ul>
    <ul class="list-group list-group-horizontal-sm d-flex justify-content-between">
    <li class="list-group-item fw-bold fs-3 px-0">Followers: </li>
    <li class="list-group-item fieldValue fs-3 px-0">${user.followers}</li>
    </ul>
    </div>
    <div class="container d-flex flex-column m-5 px-5">${userWithoutGeneralData}</div>
    </div>`;
    
    detailedSection.innerHTML = userTemplate;
  }
  
  let usersListElem = document.getElementById('usersList');
  usersListElem.addEventListener('click', function(event) { 
    if(event.target.closest('button')) {
      let selectedUserId = event.target.closest('button').previousSibling.previousSibling.textContent;
      createDetailedUser(selectedUserId);
    }
  })