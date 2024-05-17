function Graphs() {
    localStorage.removeItem('SelectedGraph');

    const handleBack = () => {
        window.location.href = '/'
    }

    const handle1 = () => {
        localStorage.setItem('SelectedGraph', 'Graph1')
        window.location.href = '/parameters'
    }
    
    const handle2 = () => {
        localStorage.setItem('SelectedGraph', 'Graph2')
        window.location.href = '/parameters'
    }

    const handle3 = () => {
        localStorage.setItem('SelectedGraph', 'Graph3')
        window.location.href = '/parameters'
    }

    const handle4 = () => {
        localStorage.setItem('SelectedGraph', 'Graph4')
        window.location.href = '/parameters'
    }

  return (
    <div>
        <button type="button" onClick={handleBack}>Back</button>
        <h1>Select Graph Type</h1>
        <button type="button" onClick={handle1}>Graph 1</button>
        <button type="button" onClick={handle2}>Graph 2</button>
        <button type="button" onClick={handle3}>Graph 3</button>
        <button type="button" onClick={handle4}>Graph 4</button>
    </div>
  )
}

export default Graphs