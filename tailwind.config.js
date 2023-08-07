/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '01': '#FFB733',
          '02': '#FFA400',
          '03': '#3E8391',
          '04': '#ABC8E7',
          '05': '#9BA8B3',
          '06': '#2D2A26',
        },
        secondary: {
          '01': '#FFEBC8',
          '02': '#EAC37D',
          '03': '#DF9208',
          '04': '#A9710A',
          '05': '#563C0D',
          '06': '#CAE3E9',
          '07': '#83B5BF',
          '08': '#19535F',
          '09': '#E0EFFF',
          10: '#80ADDD',
          11: '#4D7AA9',
          12: '#214871',
          13: '#CBD4DC',
          14: '#7B8894',
        },
        neutral: {
          '00': '#FFFFFF',
          '01': '#4F4E4E',
          '02': '#6D6D6D',
          '03': '#B1B0B0',
          '04': '#CCCCCC',
          '05': '#DDDDDD',
          '06': '#F1F1F1',
        },
        success: {
          '01': '#2A801C',
          '02': '#75B16B',
          '03': '#D8EBD5',
        },
        warning: {
          '01': '#A68010',
          '02': '#FFB733',
          '03': '#FFF3DC',
        },
        info: {
          '01': '#17528A',
          '02': '#3685CF',
          '03': '#BDD5EC',
        },
        error: {
          '01': '#80000B',
          '02': '#CC1F1F',
          '03': '#F3D1D1',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat'],
      },
      fontSize: {
        'headig-01': [
          '23px',
          {
            fontWeight: '700',
          },
        ],
        'headig-02': [
          '20px',
          {
            fontWeight: '700',
          },
        ],
        'headig-03': [
          '18px',
          {
            fontWeight: '700',
          },
        ],
        'headig-04': [
          '16px',
          {
            fontWeight: '700',
          },
        ],
        'headig-05': [
          '14px',
          {
            fontWeight: '700',
          },
        ],
        'headig-06': [
          '12px',
          {
            fontWeight: '700',
          },
        ],
        'subtitle-01': [
          '19px',
          {
            fontWeight: '600',
          },
        ],
        'subtitle-02': [
          '16px',
          {
            fontWeight: '600',
          },
        ],
        'paragraph-01': [
          '14px',
          {
            fontWeight: '600',
          },
        ],
        'paragraph-02': [
          '14px',
          {
            fontWeight: '400',
          },
        ],
        'paragraph-03': [
          '12px',
          {
            fontWeight: '600',
          },
        ],
        'paragraph-04': [
          '12px',
          {
            fontWeight: '400',
          },
        ],
        'button-01': [
          '15px',
          {
            fontWeight: '700',
          },
        ],
        'button-02': [
          '13px',
          {
            fontWeight: '700',
          },
        ],
        'link-01': [
          '14px',
          {
            fontWeight: '600',
          },
        ],
        'link-02': [
          '12px',
          {
            fontWeight: '600',
          },
        ],
        'caption-01': [
          '12px',
          {
            fontWeight: '400',
          },
        ],
        'overline-01': [
          '10px',
          {
            fontWeight: '400',
          },
        ],
        'overline-02': [
          '10px',
          {
            fontWeight: '600',
          },
        ],
      },
    },
  },
  plugins: ['nativewind/babel'],
};
