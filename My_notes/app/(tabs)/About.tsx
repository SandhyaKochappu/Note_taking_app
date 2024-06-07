
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';


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

export default function About() {
  render() {
  
    // LET'S GET THE LICENSES AND DEFINE OUR REGEXES
    const licenses: { [id: string]: ILicense } = require('./licenses.json');
    const numberRegex = /\d+(\.\d+)*/;
    const atRegex = /(?:@)/gi;

    const finalLicense: IFinalLicense[] = [];
    map(licenses, (librarySpecs, libraryName) => {
      // Extract the version of the library from the name
      const version = libraryName.match(numberRegex);
      // Removes the part after the @ 
      const nameWithoutVersion = libraryName.replace(atRegex, '').replace(version ? version[0] : '', '');
      
      finalLicense.push({ name: nameWithoutVersion, version: version ? version[0] : '', licenseSpecs: librarySpecs });
    });

    return (
      <View style={styles.root}>
        <NavBarBackground isTopTabbedView={false} />
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          data={finalLicense}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            return this.renderItem(item);
          }}
          ItemSeparatorComponent={this.renderSeparator}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
