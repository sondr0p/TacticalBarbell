// src/InputForm.styles.js

const responsiveStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        justifyContent: 'flex-start',
        background: '#f9f9f9',
        padding: 0,
        margin: 0,
        boxSizing: 'border-box',
    },
    form: {
        width: '100%',
        maxWidth: 400,
        margin: '2rem 0',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: 8,
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        boxSizing: 'border-box',
    },
    gridWrapper: {
        marginTop: 24,
        width: '100%',
        maxWidth: 900,
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        minWidth: 700,
        borderCollapse: 'collapse',
        marginTop: 8,
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    th: {
        border: '1px solid #ccc',
        padding: 10,
        background: '#f0f0f0',
        fontSize: '1rem',
    },
    td: {
        border: '1px solid #ccc',
        padding: 10,
        background: '#fff',
        fontSize: '0.95rem',
        wordBreak: 'break-word',
    },
    weekTd: {
        border: '1px solid #ccc',
        padding: 10,
        fontWeight: 'bold',
        background: '#fafafa',
        fontSize: '1rem',
    },
};

export default responsiveStyles;
