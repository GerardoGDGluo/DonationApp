import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text, View} from 'react-native';
import globalStyles from '../../assets/styles/globalStyle';
import Header from '../../components/Header/Header';
import style from './style';
import {useSelector} from 'react-redux';
import Button from '../../components/Button/Button';
import {
  StripeProvider,
  useConfirmPayment,
  usePaymentSheet,
} from '@stripe/stripe-react-native';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/BackButton/BackButton';

const Payments = () => {
  const [ready, setReady] = useState(false);
  const {initPaymentSheet, presentPaymentSheet, loadingPaymentSheet} =
    usePaymentSheet();

  const donationInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );
  const user = useSelector(state => state.user);
  const navigation = useNavigation();

  useEffect(() => {
    initialisePaymentSheet();
  }, []);

  console.log(user.email);

  const initialisePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Example Inc.',
      allowsDelayedPaymentMethods: true,
      returnURL: 'stripe-example://stripe-redirect',
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setReady(true);
    }
  };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      'https://us-central1-sripepaymentid.cloudfunctions.net/stirpePayment/payment-sheet',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
        }),
      },
    );

    const {paymentIntent, ephemeralKey, customer} = await response.json();
    console.log([paymentIntent, ephemeralKey, customer]);

    return {paymentIntent, ephemeralKey, customer};
  };

  async function buy() {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(
        'Error has occured with your payment',
        error.localizedMessage,
      );
    } else {
      Alert.alert('Successfull', 'Your payment was confirmed');
    }
  }
  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <ScrollView contentContainerStyle={style.paymentContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Header title="Making Donation" />
        <Text style={style.donationAmountDescription}>
          You are about to donate {donationInformation.price}
        </Text>

        <StripeProvider publishableKey="pk_test_51NTFUuBRRUJORUqEnIFo2g4995iyR7fjulKjqrb37xnH5d7XmjmPB0m5MpbyfiK9oXZHc9eL6obRSz0hyfQW7tQF00hgajqNNB">
          <Button title="buy" onPress={buy} isDisabled={!ready} />
        </StripeProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payments;
