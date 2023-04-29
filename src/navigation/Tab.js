import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import HomeIcon from '../assets/tab/home.svg';
import HomeIconActive from '../assets/tab/home-act.svg';
import Blogs from '../screens/Blogs/Index';
import Restaurant from '../screens/Restaurant/Index';
import Templates from '../screens/Templates/Index';
import BlogDetail from '../screens/Blogs/BlogDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RestaurantDetail from '../screens/Restaurant/RestaurantDetail';
import Location from '../screens/Restaurant/Location';
import Notifications from '../screens/Home/Notifications';
import CustomTabBar from '../components/CustomTab';
import Feelings from '../screens/Home/Feelings';
import TemplateDetails from '../screens/Templates/TemplateDetails';
import CreateNew from '../screens/Templates/CreateNew';
import ChooseTemp from '../screens/Templates/ChooseTemp';
import AddNewTemp from '../screens/Templates/AddNewTemp';
import ProceedPayment from '../screens/Templates/Subscription/ProceedPayment';
import CreateFromScratch from '../screens/Templates/CreateFromScratch';
import TitleDesp from '../screens/Templates/TitleDesp';
import Options from '../screens/Profile/Options';
import GetInTouch from '../screens/Profile/GetInTouch';
import Faq from '../screens/Profile/Faq';
import MyRestaurant from '../screens/Profile/MyRestaurant';
import AddRestaurant from '../screens/Profile/AddRestaurant';
import SubmitFeedback from '../screens/Profile/SubmitFeedback';
import ChangeLocation from '../screens/Restaurant/ChangeLocation';
import Terms from '../screens/Profile/Terms';
import Policy from '../screens/Profile/Policy';
import EditProfile from '../screens/Profile/EditProfile';
import Website from '../screens/Restaurant/Website';
import ChangePassword from '../screens/Profile/ChangePassword';
import Insights from '../screens/Home/Insights';
import About from '../screens/About';
import CreateFromScratchNew from '../screens/Templates/CreateFromScratchNew';
import AddProducts from '../screens/Templates/AddProducts';

const screenOptions = {
  headerShown: false,
};
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function BlogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={screenOptions}
        name="Blog"
        component={Blogs}></Stack.Screen>
      <Stack.Screen
        options={screenOptions}
        name="BlogDetail"
        component={BlogDetail}></Stack.Screen>
    </Stack.Navigator>
  );
}
const RStack = createNativeStackNavigator();
function RestaurantStack() {
  return (
    <RStack.Navigator>
      <RStack.Screen
        initialParams={{
          lat: '',
          lon: '',
          address: '',
        }}
        options={screenOptions}
        name="Restaurant"
        component={Restaurant}></RStack.Screen>
      <RStack.Screen
        options={screenOptions}
        name="RestaurantDetail"
        component={RestaurantDetail}></RStack.Screen>
      <RStack.Screen
        options={screenOptions}
        name="Location"
        component={Location}></RStack.Screen>
      <RStack.Screen
        options={screenOptions}
        name="ChangeLocation"
        component={ChangeLocation}></RStack.Screen>
      <RStack.Screen
        options={screenOptions}
        name="Website"
        component={Website}></RStack.Screen>
    </RStack.Navigator>
  );
}
const HStack = createNativeStackNavigator();
function HomeStack() {
  return (
    <HStack.Navigator>
      <HStack.Screen
        options={screenOptions}
        name="Homes"
        component={Home}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="Notifications"
        component={Notifications}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="Feelings"
        component={Feelings}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="Options"
        component={Options}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="GetInTouch"
        component={GetInTouch}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="Faq"
        component={Faq}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="MyRestaurant"
        component={MyRestaurant}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="AddRestaurant"
        component={AddRestaurant}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="SubmitFeedback"
        component={SubmitFeedback}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="TemplateDetails"
        component={TemplateDetails}></HStack.Screen>

      <HStack.Screen
        options={screenOptions}
        name="Terms"
        component={Terms}></HStack.Screen>

      <HStack.Screen
        options={screenOptions}
        name="Policy"
        component={Policy}></HStack.Screen>

      <HStack.Screen
        options={screenOptions}
        name="About"
        component={About}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="EditProfile"
        component={EditProfile}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="ChangePassword"
        component={ChangePassword}></HStack.Screen>
      <HStack.Screen
        options={screenOptions}
        name="Insights"
        component={Insights}></HStack.Screen>
    </HStack.Navigator>
  );
}
const TempStack = createNativeStackNavigator();
function TemplatesS() {
  return (
    <TempStack.Navigator screenOptions={{}}>
      <TempStack.Screen
        options={screenOptions}
        name="Templates"
        component={Templates}></TempStack.Screen>
      <TempStack.Screen
        options={screenOptions}
        name="TemplateDetails"
        component={TemplateDetails}></TempStack.Screen>
      <TempStack.Screen
        options={screenOptions}
        name="CreateNew"
        component={CreateNew}></TempStack.Screen>
      <TempStack.Screen
        options={screenOptions}
        name="ChooseTemp"
        component={ChooseTemp}></TempStack.Screen>
      <TempStack.Screen
        options={screenOptions}
        name="AddNewTemp"
        component={AddNewTemp}></TempStack.Screen>
      <TempStack.Screen
        options={screenOptions}
        name="ProceedPayment"
        component={ProceedPayment}></TempStack.Screen>
      <TempStack.Screen
        options={screenOptions}
        name="CreateFromScratch"
        component={CreateFromScratch}></TempStack.Screen>
      <TempStack.Screen
        options={screenOptions}
        name="TitleDesp"
        component={TitleDesp}></TempStack.Screen>
      <TempStack.Screen
        options={screenOptions}
        name="CreateFromScratchNew"
        component={CreateFromScratchNew}></TempStack.Screen>
      <TempStack.Screen
        options={screenOptions}
        name="AddProducts"
        component={AddProducts}></TempStack.Screen>
    </TempStack.Navigator>
  );
}
const App = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, focused}) =>
            !focused ? (
              <HomeIcon></HomeIcon>
            ) : (
              <HomeIconActive></HomeIconActive>
            ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Homes');
          },
        })}
      />
      <Tab.Screen name="Templates" component={TemplatesS} />
      <Tab.Screen
        options={{
          tabBarHideOnKeyboard: true,
        }}
        name="Restaurant"
        component={RestaurantStack}
      />
      <Tab.Screen name="Blogs" component={BlogStack} />
    </Tab.Navigator>
  );
};

export default App;
