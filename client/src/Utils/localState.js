export function restoreLocalState() {
  let state = {};

  try {
    const storedState = localStorage.getItem('appState');

    if (storedState) {
      state = JSON.parse(storedState);
    }
  } catch (err) {
    // If stored data is not a strigified JSON this might fail,
    // that's why we catch the error
  }

  return state;
}

export function storeLocalState(state) {
  localStorage.setItem('appState', JSON.stringify(state));
}
