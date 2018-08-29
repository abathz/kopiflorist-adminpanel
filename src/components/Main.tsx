import * as React from 'react'

interface StateProps { }

interface DispatchProps { }

interface PropsComponent extends StateProps, DispatchProps { }
interface StateComponent { }

class Main extends React.Component<PropsComponent, StateComponent> {
  render () {
    return (
      <div className='text-center'>Welcome to NextJS with Typescript</div>
    )
  }
}

export default Main
