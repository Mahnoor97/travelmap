//Vi importerer de nødvendige dependencies og libraries for å kunne kjøre applikasjonen
import React, { useState} from 'react';
import firebase from 'firebase';
import {StyleSheet, Button, View, Text, TextInput} from 'react-native';


//Her definerer vi de forskjellige variablene vi trenger for å logge inn
function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)

//Her har vi en async funksjon som autentiserer brukerne med firebase
    const Submit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data)=>{
            });
        } catch (error){
            setErrorMsg(error.message)
        }};


 //Her håndterer vi hva som skjer når vi trykker på login knappen og hvordan vi logger inn
    const handleButton = () => {
        return <Button onPress={() => Submit()} title="Login" />;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headline}>Log in here</Text>
            <TextInput
                placeholder="Username or Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(password) => setPassword(password) }
                style={styles.inputField}
                secureTextEntry
            />
            {errorMsg && (
                <Text style={styles.error}>Error: {errorMsg}</Text>
            )}
            {handleButton()}
        </View>
    );
}

//Her styler vi komponentene på siden både feilmeldingene, inputfeltene, tekstene og container
const styles = StyleSheet.create({
    error: {
        marginTop: 20,
        textAlign: 'center',
        color: 'red',
        marginBottom: 20,
        marginHorizontal: 10,
    },
    inputField: {
        borderWidth: 1,
        borderColor: "#B5EAD7",
        margin: 10,
        padding: 10,
        width: 300,
        textAlign: 'center',
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    container: {
        borderColor: "#B5EAD7",
        borderWidth: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
});

//Her eksporterer vi funksjonen så vi kan bruke den andre steder i applikasjonen vår
export default LoginForm