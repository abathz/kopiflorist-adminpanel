interface State {
  nama: string
}

const INITIAL_STATE: State = {
  nama: ''
}

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'getfull':
      return { ...state, name: action.payload }
    default:
      return state
  }
}
