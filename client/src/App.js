import React from 'react'
import { Provider } from 'react-native-paper'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
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
import {AuthContainer, useAuth} from './helpers/Auth';

const Stack = createStackNavigator()

export default function App() {
    return (
        <Provider theme={theme}>
            
      <AuthContainer>
      {({authenticated, initialized}) => {
          return <NavigationContainer
                theme={{ colors: { background: theme.colors.surface } }}>
                <Stack.Navigator
                    initialRouteName={initialized ? (authenticated ? "Dashboard" : "StartScreen") : "SplashScreen"}
                    screenOptions={({route, navigation}) => ({
                        headerShown: true,
                        headerLeft: () => (
                            /*<BackButton
                            goBack={() => navigation.pop(1)}
                            />*/
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
                        /*headerRight: () => (
                          ),*/
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
                    <Stack.Screen name="Dashboard"
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
                    </Stack.Screen>
                    <Stack.Screen name="CafetHome" component={CafetHome} 
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
                    <Stack.Screen name="CafetNewReport" component={CafetNewReport} 
                    options={{  
                        title: 'Nouveau signalement', //Set Header Title
                        headerStyle: {
                            backgroundColor: theme.colors.surface, //Set Header color
                        },
                        headerTintColor: theme.colors.primary, //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}/>
                    <Stack.Screen name="CafetViewReports" component={CafetViewReports} 
                    options={{  
                        title: 'Infos machine', //Set Header Title
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
                    <Stack.Screen name="SignalementScreen" component={SignalementScreen} 
                    options={{  
                        title: 'Un problème ?', //Set Header Title
                        headerStyle: {
                            backgroundColor: theme.colors.surface, //Set Header color
                        },
                        headerTintColor: theme.colors.primary, //Set Header text color
                        headerTitleStyle: {
                            fontWeight: 'bold', //Set Header text style
                        },
                    }}/>
                    <Stack.Screen name="MenuScreen"
                    options={{
                        //headerLeft: null,
                        title: '',
                    }}>
                    {(props) => <MenuScreen loggedIn={authenticated} {...props} />}
                  </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        }}
      </AuthContainer>
        </Provider>
    )
}