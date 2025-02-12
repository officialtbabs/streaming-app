import {Dimensions, StyleSheet} from 'react-native';
import pallete from '../constants/colors/pallete';
export const {height, width} = Dimensions.get('screen');

const createGlobalStyles = (statusBarHeight?: number) => {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    flexRow: {
      flexDirection: 'row',
    },
    flexCol: {
      flexDirection: 'column',
    },
    justifyCenter: {
      justifyContent: 'center',
    },
    justifyBetween: {
      justifyContent: 'space-between',
    },
    justifyEnd: {
      justifyContent: 'flex-end',
    },
    itemsCenter: {
      alignItems: 'center',
    },
    itemsStart: {
      alignItems: 'flex-start',
    },
    itemsEnd: {
      alignItems: 'flex-end',
    },
    gapX1: {
      columnGap: 4,
    },
    gapX2: {
      columnGap: 8,
    },
    gapY0p5: {
      rowGap: 2,
    },
    gapY1: {
      rowGap: 4,
    },
    gapY1p25: {
      rowGap: 5,
    },
    gapY3: {
      rowGap: 12,
    },
    gapY5: {
      rowGap: 20,
    },
    gapY10: {
      rowGap: 40,
    },

    // Padding Utilities
    p1: {
      padding: 4,
    },
    p2: {
      padding: 8,
    },
    p2p5: {
      padding: 10,
    },
    p3: {
      padding: 12,
    },
    p4: {
      padding: 16,
    },
    px1: {
      paddingHorizontal: 4,
    },
    px2: {
      paddingHorizontal: 8,
    },
    px3: {
      paddingHorizontal: 12,
    },
    px5: {
      paddingHorizontal: 20,
    },
    px6: {
      paddingHorizontal: 24,
    },
    px7: {
      paddingHorizontal: 28,
    },
    py1: {
      paddingVertical: 4,
    },
    py2: {
      paddingVertical: 8,
    },
    py7: {
      paddingVertical: 28,
    },
    pt1: {
      paddingTop: 4,
    },
    pt2: {
      paddingTop: 8,
    },
    pt3: {
      paddingTop: 12,
    },
    pt6: {
      paddingTop: 24,
    },
    pt12p5: {
      paddingTop: 50,
    },
    ptStatusBar: {
      paddingTop: statusBarHeight,
    },
    pl3: {
      paddingLeft: 12,
    },
    pb5: {
      paddingBottom: 20,
    },
    pb20: {
      paddingBottom: 80,
    },

    // Margin Utilities
    m0p5: {
      margin: 2,
    },
    m1: {
      margin: 4,
    },
    m2: {
      margin: 8,
    },
    m3: {
      margin: 12,
    },
    m4: {
      margin: 16,
    },
    mx1: {
      marginHorizontal: 4,
    },
    mx2: {
      marginHorizontal: 8,
    },
    mx5: {
      marginHorizontal: 20,
    },
    my1: {
      marginVertical: 4,
    },
    my2: {
      marginVertical: 8,
    },
    mr3: {
      marginRight: 12,
    },
    mr5: {
      marginRight: 20,
    },
    ml5: {
      marginLeft: 20,
    },
    mt1: {
      marginTop: 4,
    },
    mt3: {
      marginTop: 12,
    },
    mb5: {
      marginBottom: 20,
    },
    // Text Utilities
    textCapitalise: {
      textTransform: 'capitalize',
    },
    textCenter: {
      textAlign: 'center',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    textXs: {
      fontSize: 12,
    },
    textSm: {
      fontSize: 14,
    },
    textBase: {
      fontSize: 16,
    },
    textLg: {
      fontSize: 18,
    },
    textXl: {
      fontSize: 20,
    },
    text2xl: {
      fontSize: 24,
    },
    textBold: {
      fontWeight: 'bold',
    },

    fontThin: {
      fontWeight: '100', // Tailwind: font-thin (100)
    },
    fontExtraLight: {
      fontWeight: '200', // Tailwind: font-extralight (200)
    },
    fontLight: {
      fontWeight: '300', // Tailwind: font-light (300)
    },
    fontNormal: {
      fontWeight: '400', // Tailwind: font-normal (400)
    },
    fontMedium: {
      fontWeight: '500', // Tailwind: font-medium (500)
    },
    fontSemiBold: {
      fontWeight: '600', // Tailwind: font-semibold (600)
    },
    fontBold: {
      fontWeight: '700', // Tailwind: font-bold (700)
    },
    fontExtraBold: {
      fontWeight: '800', // Tailwind: font-extrabold (800)
    },
    fontBlack: {
      fontWeight: '900', // Tailwind: font-black (900)
    },

    leading3: {
      lineHeight: 12,
    },
    leading3p5: {
      lineHeight: 13,
    },
    leading4: {
      lineHeight: 16,
    },
    leading4p5: {
      lineHeight: 18,
    },
    leading5: {
      lineHeight: 20,
    },
    leading6: {
      lineHeight: 24,
    },
    leading7: {
      lineHeight: 28,
    },
    leading8: {
      lineHeight: 32,
    },

    // Color Utilities
    bgTransparent: {
      backgroundColor: pallete.transparent,
    },
    bgBlack: {
      backgroundColor: pallete.black,
    },
    bgWhite: {
      backgroundColor: pallete.white,
    },
    bgWhiteOpacity30: {
      backgroundColor: pallete.whiteOpacity30,
    },
    bgRose600: {
      backgroundColor: pallete.rose_600,
    },
    bgGray: {
      backgroundColor: '#f3f4f6',
    },
    bgBlue: {
      backgroundColor: '#3b82f6',
    },
    textBlack: {
      color: pallete.black,
    },
    textWhite: {
      color: pallete.white,
    },
    textWhiteOpacity60: {
      color: pallete.whiteOpacity60,
    },
    textGray: {
      color: '#6b7280',
    },
    textBlue: {
      color: '#3b82f6',
    },
    textRose600: {
      color: pallete.rose_600,
    },
    textGray400: {
      color: pallete.gray_400,
    },
    textShadow: {
      shadowColor: pallete.blackOpacity25,
      shadowOffset: {width: 0, height: 1.07},
      shadowOpacity: 0.98,
      shadowRadius: 10,
      elevation: 1.07,
    },

    // Border Utilities
    roundedSm: {
      borderRadius: 4,
    },
    roundedMd: {
      borderRadius: 6,
    },
    roundedLg: {
      borderRadius: 8,
    },
    rounded2xl: {
      borderRadius: 16,
    },
    borderWhiteOpacity30: {
      borderWidth: 1,
      borderColor: pallete.whiteOpacity30,
    },
    border: {
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    borderBlue: {
      borderWidth: 1,
      borderColor: '#3b82f6',
    },

    // Width and Height Utilities
    w6: {
      width: 24,
    },
    w8: {
      width: 32,
    },
    w36p5: {
      width: 146,
    },
    wFull: {
      width: '100%',
    },
    wScreen: {
      width: '100%',
    },
    maxWidth51: {
      maxWidth: 204,
    },
    maxWidth67: {
      maxWidth: 268,
    },
    h6: {
      height: 24,
    },
    h6p25: {
      height: 25,
    },
    h8: {
      height: 32,
    },
    h11: {
      height: 44,
    },
    h12: {
      height: 48,
    },
    h20: {
      height: 80,
    },
    h24p75: {
      height: 99,
    },
    h36p5: {
      height: 146,
    },
    h55: {
      height: 220,
    },
    h58p25: {
      height: 233,
    },
    h59p75: {
      height: 239,
    },
    h144p5: {
      height: 578,
    },
    hFull: {
      height: '100%',
    },
    hScreen: {
      height: height,
    },

    // Positioning
    relative: {
      position: 'relative',
    },
    absolute: {
      position: 'absolute',
    },
    top0: {
      top: 0,
    },
    bottom0: {
      bottom: 0,
    },
  });
};

export default createGlobalStyles;
