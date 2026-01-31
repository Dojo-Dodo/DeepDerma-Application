import React, {useState} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES , wallpaper} from '../constants'
import { ScreenHeaderBtn } from '../components'

const Home = () => {
    const [count, setCount] = useState(0);
    const onPress = () => setCount(prevCount => prevCount + 1);
    const router = useRouter();
    const QuickScan = () => Alert.alert("QuickScan")

    return (
        <SafeAreaView style={{flex:1, backgroundColor: "#ADD8E6"}}>
        <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.lightWhite},
                headerLeft: () => (
                    <ScreenHeaderBtn iconUrl={images.profile} dimension="100" />
                ),
                headerTitle: ""
            }}
        
        />
            <Text style={[styles_head.text, { marginBottom: 40, marginTop: 50}]}>Skin Cancer Detector</Text>
            
            <View style={styles_normal.container}>
                <TouchableOpacity style={styles_normal.button} onPress={() => router.push('/Camera_B')}>
                    <Text style={styles_normal.text}>Quick Scan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles_normal.button} onPress={onPress}>
                    <Text style={styles_normal.text}>Weekly Report</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles_normal.button} onPress={() => router.push('/Information')}>
                    <Text style={styles_normal.text}>Information</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles_normal.button} onPress={onPress}>
                    <Text style={styles_normal.text}>Setting</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles_head = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationColor: '#008631'
    },
    })

const styles_normal = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 5,
    },
    text: {
        fontSize: 40,
        fontWeight: '400',
        textAlign: 'center',
    },
    button: {
        width: 90 * 4,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5E6A9',
        margin: 20,

        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    })

    Home.id = 'HomeScreen';

export default Home;