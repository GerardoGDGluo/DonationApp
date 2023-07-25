import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text, View} from 'react-native';
import globalStyles from '../../assets/styles/globalStyle';
import Header from '../../components/Header/Header';
import style from './style';
import {useSelector} from 'react-redux';
import Button from '../../components/Button/Button';
import {
  CardForm,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {useNavigation} from '@react-navigation/native';

const Payments = () => {
  const donationInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );
  const user = useSelector(state => state.user);
  const [isReady, setIsReady] = useState(false);
  const {confirmPayment, loading} = useConfirmPayment();
  const navigation = useNavigation();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      'https://us-central1-sripepaymentid.cloudfunctions.net/stirpePayment/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          currency: 'usd',
          amount: donationInformation.price * 100,
        }),
      },
    );

    const {clientSecret} = await response.json();
    console.log(clientSecret);
    return clientSecret;
  };

  const handlePayment = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });

    if (error) {
      Alert.alert(
        'Error has occured with your payment',
        error.localizedMessage,
      );
    } else if (paymentIntent) {
      Alert.alert('Successfull', 'Your payment was confirmed');
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={[globalStyles.backgroundWhite, globalStyles.flex]}>
      <ScrollView contentContainerStyle={style.paymentContainer}>
        <Header title="Making Donation" />
        <Text style={style.donationAmountDescription}>
          You are about to donate {donationInformation.price}
        </Text>

        <StripeProvider publishableKey="pk_test_51NTFUuBRRUJORUqEnIFo2g4995iyR7fjulKjqrb37xnH5d7XmjmPB0m5MpbyfiK9oXZHc9eL6obRSz0hyfQW7tQF00hgajqNNB">
          <CardForm
            style={style.cardForm}
            onFormComplete={() => setIsReady(true)}
          />
        </StripeProvider>
      </ScrollView>
      <View style={style.donationButton}>
        <Button
          title="Donate"
          isDisabled={!isReady || loading}
          onPress={() => handlePayment()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payments;
