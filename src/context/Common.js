import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext({ chain: [] });

const withCommonContext = Comp => class extends Component {
    render() {
        return (
            <Consumer>
                {
                    chain => <Comp {...this.props} chain={chain} />
                }
            </Consumer>
        );
    }
};

export { withCommonContext, Provider, Consumer };
