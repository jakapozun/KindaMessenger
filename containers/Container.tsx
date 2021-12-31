import classes from '../styles/Container.module.css';

const Container = ({children}) => {
    return <div className={classes.Container}>
        <div className={classes.Content}>
            {children}
        </div>
            </div>;
}

export default Container;