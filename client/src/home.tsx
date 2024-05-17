function Home() {
  localStorage.removeItem('SelectedGraph');

  const handleEnter = () => {
    window.location.href = '/Graphs'
  }
  
  return (
      <div style={{ textAlign: 'center'}}>
        <h1>World Data Energy Analysis</h1>
        <h2>Generate graphs to help you visualize energy usage</h2>
        <button type="button" onClick={handleEnter}>Explore Data</button>
      </div>
  );
}

export default Home;
