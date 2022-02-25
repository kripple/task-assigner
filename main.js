// feature request - fancy selection animation where all names are visible
// feature request - disable users on a per-selection basis (won't be chosen, multiplier will not increase either, maybe)

const state = {};

const onLoad = () => {
  storeElements();
  getUserData().then(() => {
    buildSelectionPool();
  });
}

const storeElements = () => {
  state.button = document.getElementsByClassName('button')[0];
  state.name = document.getElementsByClassName('name')[0];
}

const getUserData = () => {

  return getData('users.json').then((userData) => {
    const users = userData.map((user) => new User(user));
    state.users = users;
    return users;
  })
}

const updateUserData = () => {
  if(!state.users) { return; }

  return replaceData('users.json', state.users);
}

const buildSelectionPool = () => {
  if(!state.users) { return; }

  state.selectionPool = [];
  state.users.forEach(user => {
    _.times(user.multiplier, () => { state.selectionPool.push(user) });
  });
  state.button.disabled = false;
}

const onSelect = () => {
  if (!state.selectionPool) { return }

  state.button.disabled = true;
  const selected = _.sample(state.selectionPool);
  state.name.innerHTML = selected.name;

  selectUser(selected);
}

const selectUser = (selected) => {

  state.users.forEach(user => {
    if (user.id === selected.id) {
      user.select();
    } else {
      user.updateSelectionOdds();
    }
  });

  updateUserData();
  buildSelectionPool();
}
