import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CustomInputs from './CustomInputs'
import CustomButton from './CustomButton'
import newTheme from '../utils/Constants'
import Styles from '../utils/Styles'
import Snackbar from 'react-native-snackbar'

const AddCard = (props) => {
  const [cardNumber,setCardNumber]=useState('')
  const [name,setName]=useState('')
  const [date,setDate]=useState('')
  const [cvv, setCvv]=useState('')
  // const info=()=>{
  //   if (cardNumber == ''|| name == ''|| date==''|| cvv == ''){
  //     Snackbar.show({
  //       text: 'Enter Information',
  //       duration: Snackbar.LENGTH_SHORT,
  //       backgroundColor:'red'
  //     });
  //   }else if(cardNumber<10){
  //     Snackbar.show({
  //       text:'Enter Correct Card Number',
  //       duration:Snackbar.LENGTH_SHORT,
  //       backgroundColor:'red'
  //     })
  //   }
  // }
  return (
    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
        <Text style={Styles.heading}>Add Card </Text>
        <Text style={Styles.subHeading}>Add  your card details here </Text>
        <CustomInputs  placeholder={'Card Number'} keyboardType={'number-pad'} onChange={(val)=>setCardNumber(val)} val={cardNumber}/>
        <CustomInputs  placeholder={'Card Holder Name'} onChange={(val)=>setName(val)} val={name}/>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <CustomInputs  placeholder={'Expiry date'}  widthbox={'40%'} keyboardType={'number-pad'} onChange={(val)=>setDate(val)} val={date}/>
        <CustomInputs  placeholder={'CVV'}  widthbox={'40%'} keyboardType={'number-pad'} onChange={(val)=>setCvv(val)} val={cvv}/>
        </View>
        
      <LinearGradient
                        colors={[newTheme.color1, newTheme.color2]}
              style={{borderRadius:10,marginTop:8,padding:10,width:'80%',justifyContent:'center',alignItems:'center'}}>
        <CustomButton title={'Add Card'} textcolor={newTheme.white} fontsize={20}  wbox={'90%'} padding={0.5}
        action={props.actionButton}/>
      </LinearGradient>
         
       </View>
  )
}

export default AddCard

const styles = StyleSheet.create({})