import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`

const Button = styled.button`
    background-color: lig;
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

class Hive extends Component {

    state = {
        keeper: {},
        hive: [],
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
        const hiveId = this.props.match.params.hiveId
        this.getHive(hiveId)
    }

    getHive = async (hiveId) => {
        try {
            const res = await axios.get(`/api/v1/hives/${hiveId}/`)
            this.setState({
                hive: res.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteHive = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`/api/v1/hives/${this.props.match.params.hiveId}/`)
            this.setState({
                redirectToHome: true,
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        if (this.state.redirectToHome === true) {
            return <Redirect to="/" />
        }
        return (
            <Wrapper>
                    <Link to={`/keepers/${this.props.match.params.id}`}>Go Back</Link>
                <FlexContainerCentered>
                            <Card key={this.state.hive.id}>
                                <div>{this.state.hive.name}</div>
                                <div>Date Installed: {this.state.hive.installed_date}</div>
                                <div>Number of Frames: {this.state.hive.number_of_frames}</div>
                                <div>Estimated Annual Production (Gallons): {this.state.hive.annual_production}</div>
                                <div>Date Last Harvested: {this.state.hive.last_harvested}</div>
                                <div>Number of Bees: {this.state.hive.number_of_bees}</div>
                                <img src={this.state.hive.image} alt={this.state.hive.name} />
                                <Link to={`/keepers/${this.props.match.params.id}/hives/${this.props.match.params.hiveId}/bees/`}>View Bees</Link>
                                <button onClick={this.deleteHive}>Remove Hive</button>
                            </Card>
                </FlexContainerCentered>
            </Wrapper>
        );
    }
}

export default Hive;