import palette from './palette';

export default {
  fontFamily: [
    '-apple-system',
    'Quicksand',
    'valeraRound',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '1.8rem',
    marginTop : '10px',
    letterSpacing: '-0.24px',
    lineHeight: '40px'
  },
  h2: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '1.4rem',
    marginTop : '10px',
    letterSpacing: '-0.24px',
    lineHeight: '32px'
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '1.3rem',
    marginTop : '10px',
    letterSpacing: '-0.06px',
    lineHeight: '1.4rem'
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 500,
    marginTop : '10px',
    fontSize: '1.3rem',
    lineHeight: '1.3rem'
  },
  h5: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '1.2rem',
    lineHeight: '1.2rem'
  },
  h6: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '1.1rem',
    lineHeight: '1.1rem'
  },
  subtitle1: {
    color: palette.text.primary,
    fontSize: '1rem',
    lineHeight: '1rem'
  },
  subtitle2: {
    color: palette.text.secondary,
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1rem'
  },
  body1: {
    color: palette.text.primary,
    fontSize: '1rem',
    lineHeight: '1rem'
  },
  body2: {
    color: palette.text.secondary,
    fontSize: '12px',
    letterSpacing: '-0.04px',
    lineHeight: '18px'
  },
  button: {
    color: palette.text.primary,
    fontSize: '14px'
  },
  caption: {
    color: palette.text.secondary,
    fontSize: '11px',
    letterSpacing: '0.33px',
    lineHeight: '13px'
  },
  overline: {
    color: palette.text.secondary,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    textTransform: 'uppercase'
  }
};
