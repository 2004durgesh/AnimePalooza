// Import required libraries
import React from 'react';
import tw from 'twrnc';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Import screen components
import FlixHQInfo from "./FlixHQInfo";
import FlixHQSearch from "./FlixHQSearch";
import StreamingLinks from './StreamingLinks';
import Recommendations from './Recommendations';
import RecentFlixHQEpisode from './RecentFlixHQEpisode';
import TopAiringFlixHQ from './TopAiringFlixHQ';

// Create Material Top Tab Navigator
const Tab = createMaterialTopTabNavigator();
// Create Stack Navigator
const Stack = createNativeStackNavigator();
// Movies component contains navigation stack for different screens
const FlixHQ = () => {
    return (
        <SafeAreaView style={tw`bg-black flex-1`}>
            <Stack.Navigator>
                {/* Screen for Top Tabs */}
                <Stack.Screen
                    name="TopTabs"
                    component={TopTabs}
                    options={{ headerShown: false }} // Hide the default header for TopTabs
                />
                <Stack.Screen
                    name="FlixHQInfo"
                    component={FlixHQInfo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="StreamingLinks"
                    component={StreamingLinks}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Recommendations"
                    component={Recommendations}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </SafeAreaView>
    );
}

// Component for Top Tabs
const TopTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginBottom: 4,
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "#dc2626"
                },
                tabBarStyle: {
                    backgroundColor: "#000",
                },
                tabBarAndroidRipple: {
                    color: '#DB202C',
                    borderless: true,
                }
            }}
        >
            {/* Screen for Trending */}
            <Tab.Screen
                name="Trending"
                component={TopAiringFlixHQ}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="whatshot" size={25} color={focused ? "white" : "gray"} />
                    ),
                }}
            />
            {/* Screen for Latest */}
            <Tab.Screen
                name="Latest"
                component={RecentFlixHQEpisode}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="fiber-new" size={25} color={focused ? "white" : "gray"} />
                    ),
                }}
            />
            {/* Screen for Search */}
            <Tab.Screen
                name="Search"
                component={FlixHQSearch}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons name="search" size={25} color={focused ? "white" : "gray"} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default FlixHQ;
