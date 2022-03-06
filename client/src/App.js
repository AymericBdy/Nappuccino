import React from 'react'
import { Provider } from 'react-native-paper'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
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
    CafetNewReportMachCaf,
    CafetNewReportDistrib,
    CafetViewReports,
} from './screens'
import MenuButton from './components/MenuButton'
import BackButton from './components/BackButton'
import { AuthContainer, useAuth } from './helpers/Auth';
import MenuIcon from './components/MenuIcon';
import MenuContent from './components/MenuContext';

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <Provider theme={theme}>

            <AuthContainer>
                {({ authenticated, initialized }) => {
                    return <NavigationContainer
                        theme={{ colors: { background: theme.colors.surface } }}>
                        <Drawer.Navigator
                            initialRouteName={initialized ? (authenticated ? "Dashboard" : "StartScreen") : "SplashScreen"}
                            // screenOptions={{
                            //     drawerStyle: {
                            //         backgroundColor: theme.colors.surface,
                            //     },
                            //     drawerInactiveTintColor: theme.colors.primary,
                            //     drawerActiveTintColor: theme.colors.surface,
                            //     drawerActiveBackgroundColor: theme.colors.primary

                            // }}
                            screenOptions={({ route, navigation }) => ({
                                drawerStyle: {
                                    backgroundColor: theme.colors.surface,
                                },
                                drawerInactiveTintColor: theme.colors.primary,
                                drawerActiveTintColor: theme.colors.surface,
                                drawerActiveBackgroundColor: theme.colors.primary,
                                headerShown: true,
                                headerLeft: () => (
                                    /*<BackButton
                                    goBack={() => navigation.pop(1)}
                                    />*/
                                    // <MenuButton
                                    //     //Menu Text
                                    //     menutext="Menu"
                                    //     //Menu View Style
                                    //     menustyle={{ marginRight: 16 }}
                                    //     //Menu Text Style
                                    //     textStyle={{ color: theme.colors.primary }}
                                    //     navigation={navigation}
                                    //     route={route}
                                    //     isIcon={true}
                                    // />
                                    <MenuIcon></MenuIcon>
                                ),
                                /*headerRight: () => (
                                  ),*/
                            })}
                            drawerContent={(props) => <MenuContent {...props} />}

                        >
                            {initialized ? (
                                authenticated ? (
                                    <></>
                                ) : (
                                    <>
                                        <Drawer.Screen name="StartScreen" component={StartScreen}
                                            options={{
                                                headerMode: 'none',
                                            }} />
                                        <Drawer.Screen name="LoginScreen" component={LoginScreen}
                                            options={{
                                                headerMode: 'none',
                                            }} />
                                    </>
                                )
                            ) : (
                                <Drawer.Screen name="SplashScreen" component={SplashScreen}
                                    options={{
                                        headerMode: 'none',
                                    }} />
                            )}
                            <Drawer.Screen name="Dashboard"
                                options={{
                                    //headerLeft: null,
                                    title: 'Navigation', //Set Header Title
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
                            <Drawer.Screen name="CafetNewReportMachCaf" component={CafetNewReportMachCaf}
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
                            <Drawer.Screen name="CafetNewReportDistrib" component={CafetNewReportDistrib}
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
                            <Drawer.Screen name="TanScreen" component={TanScreen}
                                options={{
                                    title: 'Horaires spotion ECN', //Set Header Title
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
                            <Drawer.Screen name="MenuScreen"
                                options={{
                                    //headerLeft: null,
                                    title: '',
                                }}>
                                {(props) => <MenuScreen loggedIn={authenticated} {...props} />}
                            </Drawer.Screen>
                        </Drawer.Navigator>
                    </NavigationContainer>
                }}
            </AuthContainer>
        </Provider >
    )
}