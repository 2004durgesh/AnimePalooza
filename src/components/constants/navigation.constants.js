const topTabScreenOptions = {
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
}

const bottomTabScreenOptions = {
    headerShown: false, // Hide the default header for all screens
    tabBarActiveTintColor: '#DB202C',
    tabBarInactiveTintColor: '#fff',
    tabBarShowLabel: true,
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    tabBarItemStyle: {
      justifyContent: 'center', // Center the tab icon and label
    },
    tabBarStyle: [
      {
        display: 'flex',
        height: 60, // Height of the bottom tab bar
        borderTopColor: 'white', // Color of the top border
        borderTopWidth: 2, // Width of the top border
        backgroundColor: 'black', // Background color of the bottom tab bar
      },
      null,
    ],
  }

  export { topTabScreenOptions, bottomTabScreenOptions}