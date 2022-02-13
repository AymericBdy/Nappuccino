import React from 'react'
import { Provider } from 'react-native-paper'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './core/theme'
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    Dashboard,
    TanScreen,
    RuScreen,
    MenuScreen,
} from './screens'
import AnnuaireScreen from './screens/AnnuaireScreen'
import MapScreen from './screens/MapScreen'
import CafetScreen from './screens/CafetScreen'
import MenuButton from './components/MenuButton'
import BackButton from './components/BackButton'

const Stack = createStackNavigator()

export default function App() {
    return (
        <Provider theme={theme}>
            <NavigationContainer
                theme={{ colors: { background: theme.colors.surface } }}>
                <Stack.Navigator
                    initialRouteName="StartScreen"
                    screenOptions={({route, navigation}) => ({
                        headerShown: true,
                        headerLeft: () => (
                            <BackButton
                            goBack={() => navigation.pop(1)}
                            />
                          ),
                        headerRight: () => (
                            <MenuButton
                              //Menu Text
                              menutext="Menu"
                              //Menu View Style
                              menustyle={{marginRight: 16}}
                              //Menu Text Style
                              textStyle={{color: theme.colors.primary}}
                              navigation={navigation}
                              route={route}
                              isIcon={true}
                            />
                          ),
                    })}
                >
                    <Stack.Screen name="StartScreen" component={StartScreen}
                    options={{    
                        headerMode: 'none',
                    }}/>
                    <Stack.Screen name="LoginScreen" component={LoginScreen}
                    options={{  
                        headerMode: 'none',
                    }}/>
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                    <Stack.Screen name="Dashboard" component={Dashboard}
                    options={{
                        headerLeft: null,
                        title: 'Navigation', //Set Header Title
                        headerStyle: {
                            backgroundColor: theme.colors.surface, //Set Header color
                        },
                        headerTintColor: theme.colors.primary, //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}/>
                    <Stack.Screen name="TanScreen" component={TanScreen} 
                    options={{  
                        title: 'Horaires station ECN', //Set Header Title
                        headerStyle: {
                            backgroundColor: theme.colors.surface, //Set Header color
                        },
                        headerTintColor: theme.colors.primary, //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}/>
                    <Stack.Screen name="CafetScreen" component={CafetScreen} 
                    options={{  
                        title: 'Infos Cafet', //Set Header Title
                        headerStyle: {
                            backgroundColor: theme.colors.surface, //Set Header color
                        },
                        headerTintColor: theme.colors.primary, //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}/>
                    <Stack.Screen name="AnnuaireScreen" component={AnnuaireScreen} 
                    options={{  
                        title: 'Annuaire', //Set Header Title
                        headerStyle: {
                            backgroundColor: theme.colors.surface, //Set Header color
                        },
                        headerTintColor: theme.colors.primary, //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}/>
                    <Stack.Screen name="MapScreen" component={MapScreen} 
                    options={{  
                        title: "Plan de l'école", //Set Header Title
                        headerStyle: {
                            backgroundColor: theme.colors.surface, //Set Header color
                        },
                        headerTintColor: theme.colors.primary, //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}/>
                    <Stack.Screen name="RuScreen" component={RuScreen} 
                    options={{  
                        title: 'Au menu ce midi', //Set Header Title
                        headerStyle: {
                            backgroundColor: theme.colors.surface, //Set Header color
                        },
                        headerTintColor: theme.colors.primary, //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}/>
                    <Stack.Screen name="MenuScreen" component={MenuScreen} 
                    options={{
                        headerLeft: null,
                        headerBackTitleVisible: false,
                        title: '',
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}