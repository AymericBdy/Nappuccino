import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './core/theme'
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
    Dashboard,
    TanScreen,
    RuScreen,
} from './screens'

const Stack = createStackNavigator()

export default function App() {
    return (
        <Provider theme={theme}>
            <NavigationContainer
                theme={{ colors: { background: theme.colors.surface } }}>
                <Stack.Navigator
                    initialRouteName="StartScreen"
                    screenOptions={{
                        headerShown: false,
                    }}

                >
                    <Stack.Screen name="StartScreen" component={StartScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen name="TanScreen" component={TanScreen} />
                    <Stack.Screen name="RuScreen" component={RuScreen} />
                    <Stack.Screen
                        name="ResetPasswordScreen"
                        component={ResetPasswordScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}