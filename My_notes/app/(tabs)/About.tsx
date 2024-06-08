import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface ILicense {
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
}

interface IFinalLicense {
  name: string;
  version: string;
  licenseSpecs: ILicense;
}

export default function About()  {
  
    // LET'S GET THE LICENSES AND DEFINE OUR REGEXES
    const licenses: { [id: string]: ILicense } = require('./licenses.json');
    const numberRegex = /\d+(\.\d+)*/;
    const atRegex = /(?:@)/gi;

    const finalLicense: IFinalLicense[] = [];
    Object.keys(licenses).map((idx) => {
    let item = licenses[idx];
    // Extract the version of the library from the name
    
    const version = idx.match(numberRegex);
    // Removes the part after the @
    const nameWithoutVersion = idx
      .replace(atRegex, '')
      .replace(version ? version[0] : '', '');
    finalLicense.push({
      name: nameWithoutVersion,
      version: version ? version[0] : '',
      licenseSpecs: item
      // onPress: () =>
      //   props.navigation && props.navigation.push('Details', item),
    });

  });

    return (
      <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="information-circle-outline" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About This App</ThemedText>
      </ThemedView>
      <ThemedText>This app is built using the following open-source libraries:</ThemedText>
      <View style={{flex: 1}}>
      <FlatList
        data={finalLicense}        
        renderItem={({item}) => 
          <ThemedView style={styles.listContainer}>
        <ThemedText type="subtitle">{`${item.name}\n`}</ThemedText>
        <ThemedText >{`${item.version}\n`}
        {`${item.licenseSpecs.licenses}\n`}</ThemedText>
        
        </ThemedView>
      }
      />
    </View>
</ParallaxScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    
    titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  
  
  listContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  }
});