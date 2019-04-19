import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`

const Button = styled.button`
    background-color: lightslategray;
    border: 2px solid lightgray;
    border-radius: 3px;
    margin: 2px;
`
const FlexContainerCentered = styled.div`
    display: flex;
    align-items: center;
`

const FlexRowCentered = styled(FlexContainerCentered)`
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #78a778;
    opacity: .9;
    align-items: center;
    text-align: center;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 2px;
    margin: 15px 15px 15px 0;
    p {
        color: #fafafa;
        font-size: 25px;
    }

    img {
        height: 250px;
        width: 250px;
        border-radius: 3px;
    }
`

const Label = styled.label`
    font-size: 18px;
    color: #fafafa;
`

const Form = styled.form`
    background: #78a778;
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 4px;
    
    input {
        margin: 15px;
    }
`

const Headings = styled.div`
    text-align: center;
    font-size: 30px;
    color: #fafafa;
`

class Keeper extends Component {
    state = {
        keeper: {},
        hives: [],
        bees: [],
        newBee: {
            species: '',
            image: '',
        },
        isKeeperFormDisplayed: false,
        redirectToHome: false,
    }

    componentDidMount() {
        const keeperId = this.props.match.params.id
        this.getKeeper(keeperId)
    }

    getKeeper = async (keeperId) => {
        try {
            const res = await axios.get(`/api/v1/keepers/${keeperId}/`)
            this.setState({
                keeper: res.data,
                hives: res.data.hives
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteKeeper = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`/api/v1/keepers/${this.props.match.params.id}/`)
            this.setState({
                redirectToHome: true,
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    updateKeeper = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`/api/v1/keepers/${this.props.match.params.id}/`, this.state.keeper)
            this.setState({
                keeper: res.data,
                isKeeperFormDisplayed: false,
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    toggleKeeperForm = () => {
        this.setState((state, props) => {
            return ({ isKeeperFormDisplayed: !state.isKeeperFormDisplayed })
        })
    }

    handleChange = (e) => {
        const cloneNewKeeper = { ...this.state.keeper }
        cloneNewKeeper[e.target.name] = e.target.value
        this.setState({ keeper: cloneNewKeeper })
    }

    // addBees = async (keeperId) => {
    //     const res = await axios.post(`/api/v1/keepers/${keeperId}/hives`)
    // }

    render() {
            if (this.state.redirectToHome === true) {
                return <Redirect to="/" />
            }
        return (
            <Wrapper>
                <h1>{this.state.keeper.name}</h1>
                <button onClick={this.toggleKeeperForm}>Update this Keeper</button>
                <button onClick={this.deleteKeeper}>Remove Keeper</button>
                {
                    this.state.isKeeperFormDisplayed
                        ? <Form onSubmit={this.updateKeeper}>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.keeper.name}
                                />
                            </div>
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <input
                                    id="location"
                                    type="text"
                                    name="location"
                                    onChange={this.handleChange}
                                    value={this.state.keeper.location}
                                />
                            </div>
                            <button>Update</button>

                        </Form>
                        :
                        null
                }
                {
                    this.state.hives.map((hive, bees) => {
                        return (
                            <Card key={hive.id}>
                                <div>{hive.name}</div>
                                <div>Date Installed: {hive.installed_date}</div>
                                <div>Number of Frames: {hive.number_of_frames}</div>
                                <div>Estimated Annual Production (Gallons): {hive.annual_production}</div>
                                <div>Date Last Harvested: {hive.last_harvested}</div>
                                <div>Number of Bees: {hive.number_of_bees}</div>
                                <div>Bees: {bees.species}</div>
                                <img src={hive.image} alt={hive.name} />
                                {/* <button onClick={this.toggleBeeForm}>Add Bees</button> */}
                            </Card>
                        )
                    })
                }
            </Wrapper>
        )
    }
}


export default Keeper