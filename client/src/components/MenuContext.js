import React from 'react';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { AuthContainer, useAuth } from '../helpers/Auth';
import { theme } from '../core/theme';

const MenuContent = (props) => {
    const auth = useAuth();
    const onLogout = () => auth.facade.logout();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label={auth.authState.authenticated ? 'Déconnexion' : 'Connexion'}
                onPress={() => {
                    onLogout().then(() => {
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'StartScreen' }],
                        })
                    });
                }}
            {...props} inactiveTintColor={theme.colors.primary}/>
        </DrawerContentScrollView>
    );
};
export default MenuContent;