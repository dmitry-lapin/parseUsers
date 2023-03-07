function displayUser(user, checkHide) {
  const fragment = document.createDocumentFragment();
  
  const userDiv = document.createElement('div');
  userDiv.classList.add('userBlock');
  fragment.append(userDiv);
  
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('col-3');
  userDiv.append(imgDiv);
  
  const userImg = document.createElement('img');
  userImg.classList.add('border','border-primary', 'user_avatar', 'rounded');
  userImg.src = user.avatar_url;
  imgDiv.append(userImg)
  
  if(checkHide) {
    user = Object.fromEntries(
      Object.entries(user)
      .filter(([key, value]) => value != null && value.length > 0)
      );
    }
    
    const dataDiv = document.createElement('div');
    dataDiv.classList.add('col-9');
    userDiv.append(dataDiv);

    usersBlock.append(fragment);
    
    for(const [param, value] of Object.entries(user)) { 
      let pElem = document.createElement('p');
      pElem.classList.add('text-white');
      pElem.innerHTML = `${param}: ${value}`;
      dataDiv.append(pElem);
    }
  }
  
  async function getUsers(names, checkHide) {
    for(let user of names) {
      let url = `https://api.github.com/users/${user}`;
      let request = await fetch(url)
      .then(successStatus => {
        if(successStatus.ok) {
          let response =  successStatus.json()
          .then(answer => JSON.stringify(answer))
          .then(data => displayUser(JSON.parse(data), checkHide));
        }
      }, faultStatus => {
        return null;
      })
    }
  }
  
  document.addEventListener('click', function(event) {
    if (event.target.closest('#searchAction')) {
      let checkHide = false;
      if (document.getElementById('hideNull').checked) {
        checkHide = true;
      }
      let users = document.getElementById('usersField').value.replaceAll(' ', '').split(',');
      getUsers(users, checkHide);
    }
  });
  
  
  let popover = document.getElementById('searchParametresModal');
  function showPopover() {
    
    popover.classList.toggle('show');
    
    let coords = searchParametres.getBoundingClientRect();
    
    popover.style.cssText = "position:fixed;";
    popover.style.left = coords.left + "px";
    popover.style.top = coords.bottom+10 + "px";
    
  }
  
  searchParametres.onclick = () => showPopover();
  
  window.onscroll = () => { popover.classList.contains('show') ? popover.classList.remove('show') : null };
  
  function generalCssSettings() {
    usersBlock.style.minHeight = window.innerHeight-48-mainNav.offsetHeight + 'px';
  }
  
  generalCssSettings();