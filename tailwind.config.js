export default {
  content: ['./src/views/screen/**/*.{vue,js}'],
  important: '#app .screen-page',
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        'screen-page': '#020817',
        'screen-panel': '#041a31',
        'screen-input': '#061b34',
        'screen-border': '#1478ba',
        'screen-border-soft': 'rgba(20, 106, 170, 0.62)',
        'screen-text': '#d8e9f6',
        'screen-muted': '#93a9bd',
        'screen-cyan': '#20b5f1',
        'screen-blue': '#6b96e8',
        'screen-green': '#86c75b',
        'screen-orange': '#f5a622',
        'screen-yellow': '#f2b841',
        'screen-red': '#ef665d',
        'screen-lime': '#9acd55',
        'screen-pie-red': '#ef6b62',
        'screen-pie-orange': '#f3a51c',
        'screen-pie-yellow': '#f5c35d',
        'screen-pie-blue': '#526fa9',
        'screen-pie-gray': '#37424c'
      },
      fontFamily: {
        screen: ['Microsoft YaHei', 'PingFang SC', 'sans-serif']
      },
      spacing: {
        12: '3.25rem',
        30: '7.5rem'
      },
      borderRadius: {
        'screen-panel': '0.5rem'
      },
      minHeight: {
        'screen-header': '4.75rem',
        'screen-toolbar': '4rem'
      },
      gridTemplateColumns: {
        'screen-desktop': 'minmax(18rem, 26%) minmax(28rem, 1fr) minmax(20rem, 28%)'
      },
      gridTemplateRows: {
        'screen-mobile': '56.5rem 48.75rem 48.75rem',
        'screen-left': '1.08fr 1fr 1.32fr',
        'screen-stack': '1fr 0.96fr',
        'screen-mobile-left': '18rem 15rem 22rem',
        'screen-mobile-stack': '24rem 24rem'
      },
      backgroundImage: {
        'screen-grid':
          'linear-gradient(rgba(22, 82, 132, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(22, 82, 132, 0.16) 1px, transparent 1px), radial-gradient(ellipse at 50% -10%, #08264a 0%, #03132a 42%, #020817 82%)',
        'screen-panel': 'linear-gradient(135deg, rgba(5, 31, 59, 0.98), rgba(3, 18, 38, 0.98))',
        'screen-panel-border':
          'radial-gradient(ellipse at top left, #20b5f1 0%, rgba(32, 181, 241, 0.92) 5%, rgba(20, 106, 170, 0.5) 15%, transparent 28%), radial-gradient(ellipse at top right, #20b5f1 0%, rgba(32, 181, 241, 0.92) 5%, rgba(20, 106, 170, 0.5) 15%, transparent 28%), radial-gradient(ellipse at bottom left, #20b5f1 0%, rgba(32, 181, 241, 0.92) 5%, rgba(20, 106, 170, 0.5) 15%, transparent 28%), radial-gradient(ellipse at bottom right, #20b5f1 0%, rgba(32, 181, 241, 0.92) 5%, rgba(20, 106, 170, 0.5) 15%, transparent 28%), linear-gradient(135deg, rgba(20, 106, 170, 0.42), rgba(7, 42, 76, 0.3) 50%, rgba(20, 106, 170, 0.42))',
        'screen-kpi': 'linear-gradient(135deg, rgba(10, 43, 76, 0.94), rgba(5, 27, 52, 0.88))',
        'screen-action': 'linear-gradient(180deg, #0c3865, #06203d)'
      },
      backgroundSize: {
        'screen-grid-size': '1.75rem 1.75rem, 1.75rem 1.75rem, 100% 100%'
      },
      boxShadow: {
        'screen-panel':
          'inset 0 0 1.5rem rgba(13, 105, 180, 0.12), 0 0 0.75rem rgba(0, 100, 190, 0.2)',
        'screen-header': '0 0 0.75rem #1d9de9'
      },
      keyframes: {
        'screen-pulse': {
          '50%': { opacity: '0.35' }
        }
      },
      animation: {
        'screen-pulse': 'screen-pulse 1s infinite'
      },
      content: {
        empty: '\'\''
      }
    }
  }
}
