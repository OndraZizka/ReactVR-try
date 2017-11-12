import React from 'react';
import {
    AppRegistry,
    asset,
    Pano, Text, View, Box, Cylinder, Image, PointLight, Sphere, AmbientLight
} from 'react-vr';

export default class WelcomeToVR extends React.Component {

    constructor() {
        super();
        this.state = { camera: [0, 0, 0] };
    }

    render() {
        var distances = [...Array(5).keys()].map(i => -4 + 2*i);

        var STEP = 0.2;
        let rootComponent = this;

        return (
            <View onInput={event => {
                    //console.log(event.nativeEvent);
                    var inputEvent = event.nativeEvent.inputEvent;
                    if (inputEvent.type == "MouseInputEvent" && inputEvent.eventType == "wheel") {}
                    if (inputEvent.type == "KeyboardInputEvent" && inputEvent.eventType == "keypress") {
                        if (inputEvent.code == "KeyW")
                            //this.camera.z += STEP;
                            rootComponent.setState({camera: [0, 0, rootComponent.state.camera[2] + STEP]});
                        else if (inputEvent.code == "KeyS")
                            //this.camera.z -= STEP;
                            rootComponent.setState({camera: [0, 0, rootComponent.state.camera[2] - STEP]});
                        console.log("Event:", inputEvent);
                        console.log(rootComponent.state.camera);
                    }
                }}
                style={{transform: [{translate: [0, 0, -10+rootComponent.state.camera[2]]}]}}
            >
                <PointLight
                    style={{color: 'white', transform: [{translate: [0, 400, 700]}]}}
                    intensity={0.8}
                />
                <AmbientLight intensity={0.4}/>
                <Pano source={asset("pano-tulipany.jpg")}/>

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

                <Box lit dimWidth={0.24} dimDepth={0.24} dimHeight={0.14}
                    style={{
                        color: "lightblue",
                        transform: [{translate: [-0.4+this.state.camera[2], 0.6, -2]}, {rotateY: +30}, {rotateX: +40}],
                    }}
                />
                {/* Floor */}
                <Box lit dimWidth={30} dimDepth={30} dimHeight={0.04}
                     style={{
                         color: "darkgreen",
                         transform: [{translate: [0,-3.3,0]}],
                     }}
                     texture={asset("textures/grass-short.jpg")}
                />
                <Tree style={{transform: [{translate: [ -2, 0, -3.8]}]}} crownColor={'darkgreen'} />
                <Tree style={{transform: [{translate: [  2, 0, -3.8]}]}} crownColor={'orange'} />
                <Tree style={{transform: [{translate: [ -1, 0,  11.8]}]}} crownColor={'#f4eb42'} />

                {/* Columns*/}
                {
                    distances.map((dist) => {
                        return <View>
                            <Column style={{transform: [{translate: [ 4.5, -2, dist]}]}} />
                            <Column style={{transform: [{translate: [-4.5, -2, dist]}]}} />
                        </View>
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
                              color: "white",
                              transform: [{translate: [0, -1, 0]}],
                          }}
                          texture={asset("textures/bark-birch.jpg")}
                />
                <Sphere lit radius={1} widthSegments={20} heightSegments={12}
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

