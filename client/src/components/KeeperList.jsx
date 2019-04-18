import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class KeeperList extends Component {
    state = {
        keepers: [],
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

    render() {
        return ( 
            <div>
            <h1>keepers</h1>
        {
            this.state.keepers.map(keeper => (
                <div key={keeper.id}>
                    <Link to={`/keepers/${keeper.id}`} >{keeper.name}</ Link>
                    <div>{keeper.location}</div>
                </div>
            ))
        }
        </div>
        )
    }

}

export default KeeperList