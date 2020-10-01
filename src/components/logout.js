import { useHistory } from 'react-router-dom';

function Protectedroute() {
    const history = useHistory()
    if (localStorage.getItem('jwt')) {
        history.push('/')
    } else {
        history.push('/login')
    }
}


export { Protectedroute }