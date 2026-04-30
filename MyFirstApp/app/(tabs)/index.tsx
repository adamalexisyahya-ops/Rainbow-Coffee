// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">HELLOOOOO!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

//old code on top

// new code below

import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { View, Text} from 'react-native';

export default function App() {
  return (
    <View style={s.screen}>
        <Image
            source={{ uri: 'https://scontent.fdvo1-2.fna.fbcdn.net/v/t39.30808-6/342504767_1296321470970546_34225895670814679_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGpC0YaphsTPh6-tG-byLoMXoEDUv1XquRegQNS_Veq5JgIHn0aSCTpTbzHFIS75N2lm2p2JQLnfgJUH5V5ciW1&_nc_ohc=FLW_tWWqFNoQ7kNvwGQM-Gn&_nc_oc=Adq9JONKNAIJV04vNNOQdpqkbcVOkMvbPMKtSdJPNO-999p86SjZvpnKUOA25XG6QL0&_nc_zt=23&_nc_ht=scontent.fdvo1-2.fna&_nc_gid=XyIhybMPxsYpwkvIqRy2bA&_nc_ss=7b2a8&oh=00_Af0-MmlkILvP1IlibXr7ftLoI0r0IOeEjLZGDhnBnWZypg&oe=69F897E6'}}
            style={s.photo}
        />
        <Text style={s.name}>Adam Alexis Yahya</Text>
        <Text style={s.bio}>MMA Student • CS126</Text>
    </View>
  );
}

const s = StyleSheet.create({
    screen: {flex:1, backgroundColor: '#d2cdb7', alignItems: 'center', justifyContent: 'center'},
    photo: {width: 120, height: 120, borderRadius: 60},
    name: {fontSize: 24, fontWeight: 'bold', marginTop: 16},
    bio: {fontSize: 16, color: '#888'},
});