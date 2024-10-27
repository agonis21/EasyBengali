import React from 'react';
import { Animated, View, Text, FlatList, PanResponder, PanResponderInstance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface TestComponentProps {
    name: string;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const colorMap = {}

export default class TestComponent extends React.Component {
    state = {
        data: Array.from(Array(200), (_, i) => {
            colorMap[i] = getRandomColor(i);
            return i;
        })
    };

    _panResponder: PanResponderInstance;
    point = new Animated.ValueXY;

    constructor(props) {
        super(props);
        
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log(gestureState.moveY);
                Animated.event([{y: this.point.y}],
                    {useNativeDriver: false})({y: gestureState.moveY});
                // Handling gesture move
            },
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderRelease: (evt, gestureState) => {
                // The gesture has been released
            }
        });
    }

    render() {
        const { data } = this.state;

        return (

                <View style={styles.container}>
                    <Text>Username:</Text>
                    <Animated.View style={{backgroundColor: 'black', zIndex: 2, height: 20, width: 20}}>
                        <Text>Hello</Text>
                    </Animated.View>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <View style={{ backgroundColor: colorMap[item], padding: 30, flexDirection: 'row' }}>
                                <View {...this._panResponder.panHandlers}>
                                    <Text style={{ fontSize: 36 }}>@ </Text>
                                </View>
                                <Text style={{ fontSize: 16, textAlign: 'center', flex: 1 }}>{item}</Text>
                            </View>
                        )}
                        keyExtractor={item => "" + item}
                    />
                </View>

        );
    }
}

const styles = {
    container: {
        backgroundColor: 'white',
        height: 600
    }
};
