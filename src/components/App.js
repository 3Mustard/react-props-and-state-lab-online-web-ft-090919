import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    });
  }

  onFindPetsClick = (e) => {
    if(this.state.filters.type === 'all'){
      fetch('/api/pets')
      .then(response => response.json())
      .then(pets => {
      
        this.setState({
          pets
        })
      });
    }else{
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(response => response.json())
      .then(pets => {
        this.setState({
          pets
        })
      })
    } 
  }

  onAdoptPet = (id) => {
    this.setState({
      pets: this.state.pets.map(pet => pet.id === id ? {...pet, isAdopted: true } : pet )
    });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
