import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`

const Button = styled.button`
    background-color: #656432;
    border: 2px solid lightgray;
    border-radius: 3px;
    margin: 10px;
`
const FlexContainerCentered = styled.div`
    display: flex;
    align-items: center;
`

const FlexRowCentered = styled(FlexContainerCentered)`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    opacity: .8;
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
`

const Label = styled.label`
    font-size: 18px;
    color: #fafafa;
    padding: 10px;
`

const Form = styled.form`
    background: #656432;
    opacity: .8;
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

class KeeperList extends Component {
    state = {
        keepers: [],
        newKeeper: {
            name: '',
            location: '',
        },

    }

    componentDidMount() {
        this.getAllKeepers()
    }

    getAllKeepers = async () => {
        try {
            const res = await axios.get('/api/v1/keepers/')
            this.setState({ keepers: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }

    createKeeper = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/keepers/', this.state.newKeeper)
            const keeperList = [...this.state.keepers]
            keeperList.unshift(res.data)
            this.setState({
                newKeeper: {
                    name: '',
                    location: '',
                },
                keepers: keeperList
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    handleChange = (e) => {
        const cloneNewKeeper = { ...this.state.newKeeper }
        cloneNewKeeper[e.target.name] = e.target.value
        this.setState({ newKeeper: cloneNewKeeper })
    }

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to="/" />
        }
        return (
            <Wrapper>
                <Headings>Keepers</Headings>

                <FlexRowCentered>
                    {
                        this.state.keepers.map(keeper => (
                            <Card key={keeper.id}>
                                <Link to={`/keepers/${keeper.id}`} >{keeper.name}</ Link>
                                <div>{keeper.location}</div>
                            </Card>
                        ))
                    }

                </FlexRowCentered>
                < h2 > Create New Keeper</h2 >
                <FlexRowCentered>
                    <Form onSubmit={this.createKeeper}>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                                value={this.state.newKeeper.name}
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <input
                                id="location"
                                type="text"
                                name="location"
                                onChange={this.handleChange}
                                placeholder='City'
                                value={this.state.newKeeper.location}
                            />
                        </div>
                        <Button>Create</Button>
                    </Form>
                </FlexRowCentered>
            </Wrapper>
        )
    }

}

export default KeeperList