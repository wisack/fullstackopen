import { useDispatch } from 'react-redux'
const VisibilityFilter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
      dispatch({type: 'visibilityFilter/filterChange', payload: event.target.value})
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default VisibilityFilter