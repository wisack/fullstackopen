const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const changedNoteGood = {...state, good: state.good+1}
      return changedNoteGood
    case 'OK':
      const changedNoteOk = {...state, ok: state.ok+1}
      return changedNoteOk
    case 'BAD':
      const changedNoteBad = {...state, bad: state.bad+1}
      return changedNoteBad
    case 'ZERO':
      return initialState
    default: return initialState
  }
  
}

export default counterReducer
