
const ScoreDisplay = ({ correctCount, incorrectCount }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ color: 'green', marginRight: 10, fontWeight: 'bold', fontSize:'24px' }}>{correctCount} : </span>
        <span style={{ color: 'red',fontWeight: 'bold', fontSize:'24px' }}>{incorrectCount}</span>
      </div>
    );
  };

export default ScoreDisplay;
