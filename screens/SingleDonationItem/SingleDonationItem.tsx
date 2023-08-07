import React from 'react';
import style from './style';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import globalStyles from '../../assets/styles/globalStyle';
import BackButton from '../../components/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';
import Badge from '../../components/Badge/Badge';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import {Routes} from '../../Navigation/Routes';

const SingleDonationItem = ({route}) => {
  const donationInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );
  const navigation = useNavigation();

  const categoryInformation = route.params.categoryInformation;

  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
        <BackButton onPress={() => navigation.goBack()} />

        <Image source={{uri: donationInformation.image}} style={style.image} />
        <View style={style.badge}>
          <Badge title={categoryInformation.name} />
        </View>

        <Header
          type="h1"
          title={
            'Ahereas disregard and contempt for human rights have resulted'
          }
        />
        <Header
          type="h2"
          title={
            'Whereas disregard and contempt for human rights have resulted'
          }
        />

        <Text className="font-[Montserrat]  mx-3">
          {donationInformation.description}
        </Text>
        <Text style={style.description}>{donationInformation.description}</Text>
        <Text style={style.description}>{donationInformation.description}</Text>
        <Text style={style.description}>{donationInformation.description}</Text>
        <Text style={style.description}>{donationInformation.description}</Text>
        <Text style={style.description}>{donationInformation.description}</Text>
        <Text style={style.description}>{donationInformation.description}</Text>
        <Text style={style.description}>{donationInformation.description}</Text>
        <Text style={style.description}>{donationInformation.description}</Text>
      </ScrollView>
      <View style={style.button}>
        <Button
          onPress={() => navigation.navigate(Routes.Payment)}
          title="Donate"
        />
      </View>
    </SafeAreaView>
  );
};

export default SingleDonationItem;
