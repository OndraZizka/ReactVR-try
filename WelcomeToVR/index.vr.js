import React from 'react';
import {
    AppRegistry,
    asset,
    Pano, Text, View, Box, Cylinder, Image, PointLight, Sphere, AmbientLight
} from 'react-vr';

export default class WelcomeToVR extends React.Component {
    render() {
        var distances = [...Array(5).keys()].map(i => -4 + 2*i);

        return (
            <View>
                <PointLight
                    style={{color: 'white', transform: [{translate: [0, 400, 700]}]}}
                    intensity={0.6}
                />
                <AmbientLight intensity={0.3}/>
                <Pano source={asset('chess-world.jpg')}/>

                <Text style={{
                        color: 'white', backgroundColor: 'black',
                        fontSize: 0.8, fontWeight: '400',
                        layoutOrigin: [0.5, 0.5],
                        paddingLeft: 0.2,
                        paddingRight: 0.2,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        transform: [{translate: [0, 0, -4]}],
                    }}>
                    Blackboard
                </Text>
                <ColorChange/>

                <Cylinder lit
                    radiusTop={0.2}
                    radiusBottom={0.25}
                    dimHeight={2.5}
                    segments={16}
                    style={{
                        color: "brown",
                        transform: [{translate: [2, -1, -3.8]}],
                    }}
                />
                <Sphere lit radius={1}
                    style={{
                        color: "darkorange",
                        transform: [{translate: [2, 0, -3.8]}],
                    }}
                />
                <Box lit dimWidth={0.24} dimDepth={0.24} dimHeight={0.14}
                    style={{
                        color: "lightblue",
                        transform: [{translate: [0.4, 0.4, -2]}, {rotateY: +30}, {rotateX: +40}],
                    }}
                />
                <Tree style={{transform: [{translate: [-2, 0, -3.8]}]}} crownColor={'darkgreen'} />
                <Tree style={{transform: [{translate: [-3.9, 0, -4]}]}} crownColor={'#f4eb42'} />
                {/*
                <Column style={{transform: [{translate: [-4.5, -2, -4]}]}} />
                <Column style={{transform: [{translate: [-4.5, -2, -2]}]}} />
                <Column style={{transform: [{translate: [-4.5, -2,  0]}]}} />
                <Column style={{transform: [{translate: [-4.5, -2,  2]}]}} />
                <Column style={{transform: [{translate: [-4.5, -2,  4]}]}} />
                <Column style={{transform: [{translate: [ 4.5, -2, -4]}]}} />
                <Column style={{transform: [{translate: [ 4.5, -2, -2]}]}} />
                <Column style={{transform: [{translate: [ 4.5, -2,  0]}]}} />
                <Column style={{transform: [{translate: [ 4.5, -2,  2]}]}} />
                <Column style={{transform: [{translate: [ 4.5, -2,  4]}]}} />
                */}
                {
                    distances.map((dist) => {
                        return <Column style={{transform: [{translate: [ 4.5, -2, dist]}]}}/>
                    })
                }
                {
                    distances.map((dist) => {
                        return <Column style={{transform: [{translate: [-4.5, -2,  dist]}]}} />
                    })
                }
            </View>
        );
    }
};

export class Tree extends React.Component {
    render() {
        const { style, crownColor } = this.props;
        return (
            <View style={style}>
                <Cylinder lit
                          radiusTop={0.2}
                          radiusBottom={0.25}
                          dimHeight={2.5}
                          segments={16}
                          style={{
                              color: "brown",
                              transform: [{translate: [0, -1, 0]}],
                          }}
                />
                <Sphere lit radius={1}   widthSegments={20} heightSegments={12}
                        style={{
                            /*color: "darkgreen",*/
                            color: crownColor,
                            transform: [{translate: [0, 1, 0]}],
                        }}
                />
            </View>
        )
    }
};

export class Column extends React.Component {
    render() {
        const { style } = this.props;
        return (
            <View style={style}>
                <Cylinder lit
                          radiusTop={0.4}
                          radiusBottom={0.4}
                          dimHeight={6}
                          segments={16}
                          style={{
                              color: "lightgray",
                              transform: [{translate: [0, 3, 0]}],
                          }}
                />
                <Cylinder lit
                          radiusTop={0.6}
                          radiusBottom={0.6}
                          dimHeight={0.1}
                          segments={16}
                          style={{
                              color: "lightgray",
                              transform: [{translate: [0, 0, 0]}],
                          }}
                />
                <Cylinder lit
                          radiusTop={0.6}
                          radiusBottom={0.6}
                          dimHeight={0.1}
                          segments={16}
                          style={{
                              color: "lightgray",
                              transform: [{translate: [0, 6, 0]}],
                          }}
                />
            </View>
        )
    }
};


export class ColorChange extends React.Component {
    constructor() {
        super();
        this.state = {textColor: 'white'};
    }

    render() {
        return (
            <Text
                style={{color: this.state.textColor, transform: [{translate: [0, 0, -3]}], }}
                onEnter={() => this.setState({textColor: 'red'})}
                onExit={() => this.setState({textColor: 'white'})}
            >
                This text will turn red when you look at it.
            </Text>
        );
    }
}

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
