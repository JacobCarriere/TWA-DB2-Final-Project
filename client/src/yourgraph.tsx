function YourGraph() {

    const handleBack = () => {
        window.location.href = '/parameters'
    }

  return (
    <div>
        <button type="button" onClick={handleBack}>Back</button>
        <h1>Generated Graph Here</h1>
    </div>
    
  )
}

export default YourGraph