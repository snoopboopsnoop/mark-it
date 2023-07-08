import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from '../Pages/Login';

const Drawer = createDrawerNavigator();

export function AccDrawer() {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Log Out" component={Login}/>
        </Drawer.Navigator>
    )
}