//Vi importerer de nødvendige dependencies og libraries for å kunne kjøre applikasjonen
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HelpScreen from "./components/HelpScreen";
import ExploreScreen from "./components/ExploreScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import React, {useEffect, useState} from 'react';
import LoginForm from "./components/LoginScreen";


//Her setter vi inn en innebygd bottom bar navigator
const Tab = createBottomTabNavigator();

//Funksjonen som router i mellom de forskejllige screens når vi trykker på de ulike ikonene
function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Explore') {

                        return (
                            <Ionicons
                                name='md-globe-outline'
                                color={color}
                                size={size}
                            />
                        );

                    } else if (route.name === 'Help') {
                        return (
                            <Ionicons
                                name='md-help-outline'
                                color={color}
                                size={size}
                            />
                        );

                    }else if (route.name === 'Login') {
                        return (
                            <Ionicons
                                name='md-log-in-outline'
                                color={color}
                                size={size}
                            />
                        ) }
                    else
                        {
                            return (
                                <Ionicons
                                    name='md-list-outline'
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                },
            })}
                           tabBarOptions={{
                               activeTintColor: 'black',
                               inactiveTintColor: 'gray',
                           }}
            >
                <Tab.Screen name="Explore" children={()=><ExploreScreen/>} />
                <Tab.Screen name="Help" children={()=><HelpScreen/>} />
                <Tab.Screen name="Login" children={()=><LoginForm/>} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

//Konfigurasjons data fra Firebase for intiere databasen
const firebaseConfig = {
    apiKey: "AIzaSyB7pxSoGPTe7i1S54tKoWNpnM-oNFhJkAI",
    authDomain: "travelmap-d64d0.firebaseapp.com",
    projectId: "travelmap-d64d0",
    storageBucket: "travelmap-d64d0.appspot.com",
    messagingSenderId: "99429925473",
    appId: "1:99429925473:web:d48fefb372fdba86e7a020"
};

export default App;

//Her har vi login funksjonen som ikke er skrevet helt fullstending, men satt opp for firebase skyld, og kommer til å bli videreutviklet
//En sign up screen er også på vej, men ble nedprioritert fremfor login screen
function login() {
    const [user, setUser] = useState({ loggedIn: false });

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

//onAuthStateChange er en metode som listener til om brukeren er logget inn eller ikke
    function onAuthStateChange(callbck) {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callbck({loggedIn: true, user: user});
            } else {
                callbck({loggedIn: false});
            }
        });
    }
}

