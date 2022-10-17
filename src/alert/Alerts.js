// To envoke the Alert with content you need to import the setAlert function from alertSlice.js
// Then dispatch the function with the Alert object. 
import { useSelector, useDispatch } from 'react-redux';
import { Close } from '@material-ui/icons';
import classNames from 'classnames';
import { resetAlert } from '../features/alerts/alertSlice'

function Alerts() {

  const alertBody = useSelector(state => state.alert.value.body);
  const showAlert = useSelector(state => state.alert.value.visible);
  const alertType = useSelector(state => state.alert.value.type);
  const dispatch = useDispatch();

  function alertColor(){
    let color = ''
    switch (alertType) {
      case 'success':
        color = 'green'
        break;
      case 'info':
        color = 'orange'
        break;
      case 'warning':
        color = 'tropical-blue'
        break;
      case 'error':
        color = 'red'
        break;
      default:
        color = 'green'
        break;
    }
    return color
  }

  function notificaitonClass(){
    let background = `tw-bg-k-${alertColor()}`
    let border = `tw-border-k-${alertColor()}`

    let classes = {'tw-block': true,
      'tw-border-solid': true,
      'tw-border': true,
      [background]: true,
      [border]: true,
      'tw-py-2': true,
      'tw-px-3': true,
      'tw-rounded-md': true,
      'tw-mb-3': true,
    }

    return classes
  }

  function alert(){
    if(showAlert){
      return (
        <div className={classNames(notificaitonClass())}>
            <div className="tw-self-center">
              <span className="tw-leading-4">{alertBody}</span>
              <Close onClick={() => dispatch(resetAlert())} className="tw-cursor-pointer tw-text-2xl tw-mr-4 tw-float-right"/>
            </div>
        </div>
      )
    }else{return null}
  }

  return alert();
}

export default Alerts;