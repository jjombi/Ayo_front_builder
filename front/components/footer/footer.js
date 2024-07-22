import Adfit from "@components/Adfit"

const Footer = ({position,absolute}) => {
    return(
        <footer style={position === 'absolute' ? {position : 'absolute', bottom : 0} : null}>
            <Adfit unit="DAN-87ortfszgGZjj16M"></Adfit>
        </footer>
    )
}
export default Footer