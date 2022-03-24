import React from 'react'
import { Provider } from 'react-native-paper'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { theme } from './core/theme'
import {
    StartScreen,
    LoginScreen,
    Dashboard,
    TanScreen,
    RuScreen,
    MenuScreen,
    SplashScreen,
    AnnuaireScreen,
    MapScreen,
    CafetHome,
    CafetNewReport,
    CafetViewReports,
    SignalementScreen,
} from './screens'
import MenuButton from './components/MenuButton'
import BackButton from './components/BackButton'
import { AuthContainer, useAuth } from './helpers/Auth';
import MenuIcon from './components/MenuIcon';
import MenuContent from './components/MenuContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function CafetStack() {
 return <Stack.Navigator
        initialRouteName="CafetHome"
        screenOptions={({route, navigation}) => ({
            headerShown: true,
            headerLeft: () => (
                <MenuIcon></MenuIcon>
            ),
        })}
    >
        <Drawer.Screen name="CafetHome" component={CafetHome}
            options={{
                title: 'Infos Cafet', //Set Header Title
                headerStyle: {
                    backgroundColor: theme.colors.surface, //Set Header color
                },
                headerTintColor: theme.colors.primary, //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }} />
        <Drawer.Screen name="CafetNewReport" component={CafetNewReport}
            options={{
                title: 'Nouveau signalement', //Set Header Title
                headerStyle: {
                    backgroundColor: theme.colors.surface, //Set Header color
                },
                headerTintColor: theme.colors.primary, //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }} />
        <Drawer.Screen name="CafetViewReports" component={CafetViewReports}
            options={{
                title: 'Infos machine', //Set Header Title
                headerStyle: {
                    backgroundColor: theme.colors.surface, //Set Header color
                },
                headerTintColor: theme.colors.primary, //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }} />
    </Stack.Navigator>
}

function AppDrawer(initialized, authenticated) {
    return <Drawer.Navigator
            initialRouteName={"Dashboard"}
            screenOptions={({ route, navigation }) => ({
                drawerStyle: {
                    backgroundColor: theme.colors.surface,
                },
                drawerInactiveTintColor: theme.colors.primary,
                drawerActiveTintColor: theme.colors.surface,
                drawerActiveBackgroundColor: theme.colors.primary,
                headerShown: true,
                headerLeft: () => (
                    <MenuIcon></MenuIcon>
                ),
            })}
            drawerContent={(props) => <MenuContent {...props} />}
        >
        <Drawer.Screen name="Dashboard"
            options={{
                //headerLeft: null,
                title: 'Accueil', //Set Header Title
                headerStyle: {
                    backgroundColor: theme.colors.surface, //Set Header color
                },
                headerTintColor: theme.colors.primary, //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }}>
            {(props) => <Dashboard loggedIn={authenticated} {...props} />}
        </Drawer.Screen>

        <Drawer.Screen name="Infos cafet" component={CafetStack}
            options={{
                headerMode: 'none',
                headerShown: false,
            }}/>

        <Drawer.Screen name="TanScreen" component={TanScreen}
            options={{
                title: 'Horaires station ECN', //Set Header Title
                headerStyle: {
                    backgroundColor: theme.colors.surface, //Set Header color
                },
                headerTintColor: theme.colors.primary, //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }} />

        <Drawer.Screen name="AnnuaireScreen" component={AnnuaireScreen}
            options={{
                title: 'Annuaire', //Set Header Title
                headerStyle: {
                    backgroundColor: theme.colors.surface, //Set Header color
                },
                headerTintColor: theme.colors.primary, //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }} />

        <Drawer.Screen name="MapScreen" component={MapScreen}
            options={{
                title: "Plan de l'école", //Set Header Title
                headerStyle: {
                    backgroundColor: theme.colors.surface, //Set Header color
                },
                headerTintColor: theme.colors.primary, //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }} />

        <Drawer.Screen name="RuScreen" component={RuScreen}
            options={{
                title: 'Au menu ce midi', //Set Header Title
                headerStyle: {
                    backgroundColor: theme.colors.surface, //Set Header color
                },
                headerTintColor: theme.colors.primary, //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }} />

        <Drawer.Screen name="SignalementScreen" component={SignalementScreen}
            options={{
                title: 'Un problème ?', //Set Header Title
                headerStyle: {
                    backgroundColor: theme.colors.surface, //Set Header color
                },
                headerTintColor: theme.colors.primary, //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }} />

        <Drawer.Screen name="MenuScreen"
            options={{
                //headerLeft: null,
                title: '',
            }}>
            {(props) => <MenuScreen loggedIn={authenticated} {...props} />}
        </Drawer.Screen>
    </Drawer.Navigator>
}

export default function App() {
    return (
        <Provider theme={theme}>
            <AuthContainer>
                {({ authenticated, initialized }) => {
                    return <NavigationContainer
                        theme={{ colors: { background: theme.colors.surface } }}>
                        <Stack.Navigator
                            initialRouteName={initialized ? (authenticated ? "Dashboard" : "StartScreen") : "SplashScreen"}
                            screenOptions={({route, navigation}) => ({
                                headerShown: false,
                                headerLeft: null,
                            })}
                        >
                            {initialized ? (
                                authenticated ? (
                                    <></>
                                ) : (
                                    <>
                                    <Stack.Screen name="StartScreen" component={StartScreen}
                                        options={{    
                                            headerMode: 'none',
                                        }}/>
                                    <Stack.Screen name="LoginScreen" component={LoginScreen}
                                        options={{  
                                            headerMode: 'none',
                                        }}/>
                                    </>
                                )
                            ) : (
                                <Stack.Screen name="SplashScreen" component={SplashScreen}
                                options={{    
                                    headerMode: 'none',
                                }}/>
                            )}
                            <Stack.Screen name="AppDrawer"
                                options={{    
                                    headerMode: 'none',
                            }}>
                                {(props) => <AppDrawer authenticated={authenticated} initialized={initialized} {...props} />}
                            </Stack.Screen>
                        </Stack.Navigator>
                    </NavigationContainer>
                }}
            </AuthContainer>
        </Provider >
    )
}