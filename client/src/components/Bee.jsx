import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`

const Button = styled.button`
    background-color: lightgreen;
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
    opacity: .7;
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

class Bee extends Component {
    state = {
        bees: [],
        newBee: {
            species: '',
            image: '',
            hive: this.props.match.params.hiveId,
        },
        isKeeperFormDisplayed: false,
        redirectToHome: false,
    }

    componentDidMount() {
        const hiveId = this.props.match.params.hiveId
        this.getBees()
    }

    getBees = async () => {
        try {
            const res = await axios.get(`/api/v1/bees/`)
            this.setState({
                bees: res.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    createBees = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`/api/v1/bees/`, this.state.newBee)

            const BeesId = this.props.match.params.id
            this.state.isHiveFormDisplayed = false
            this.getBees()

        }
        catch (err) {
            console.log(err)
        }
    }

    deleteBees = async (e, beeId) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`/api/v1/bees/${beeId}/`)
            this.getBees()
        }
        catch (err) {
            console.log(err)
        }
    }

    handleBeeChange = (e) => {
        const cloneNewBee = { ...this.state.newBee }
        cloneNewBee[e.target.name] = e.target.value
        this.setState({ newBee: cloneNewBee })
    }

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to="/" />
        }
        return (
            <Wrapper>
                <Link to={`/keepers/${this.props.match.params.id}/hives/`}>Go Back</Link>
                <FlexContainerCentered>
                    <Form onSubmit={this.createBees}>
                        <div>
                            <Label htmlFor="species">Species</Label>
                            <input
                                id="species"
                                type="text"
                                name="species"
                                onChange={this.handleBeeChange}
                                value={this.state.newBee.species}
                            />
                        </div>
                        <div>
                            <Label htmlFor="image">Image</Label>
                            <input
                                id="image"
                                type="text"
                                name="image"
                                onChange={this.handleBeeChange}
                                value={this.state.newBee.image}
                            />
                        </div>
                        <Button>Create</Button>
                    </Form>
                </FlexContainerCentered>
                <FlexContainerCentered>
                    {
                        this.state.bees.map(bee => {
                            return (
                                <Card key={bee.id}>
                        <div>{bee.species}</div>
                        <img src={bee.image} alt={bee.species} />
                        <button onClick={(e) => this.deleteBees(e, bee.id)}>Remove Bees</button>
                    </Card>
                            )
                        })
                    }
                    
                </FlexContainerCentered>
            </Wrapper>
        );
    }
}

export default Bee;