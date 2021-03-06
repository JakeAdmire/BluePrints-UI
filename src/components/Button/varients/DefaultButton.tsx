import React, { FunctionComponent } from 'react';
import { createUseStyles } from 'react-jss';
// 
import { ButtonProps } from '../Button';
import styles from '../styles.css';

type UniqueProps = {
    className?: any,
    determineTextColor: Function
} & Partial<ButtonProps>

const useStyles = createUseStyles({
    defaultButton: {
        background: (props: UniqueProps) => props.backgroundColor,
        boxShadow: (props: UniqueProps) => props.disabled ? 'none' : '0 2px 5px #00000026',    
        transition: 'box-shadow .2s, transform .2s',

        '&:hover': {
            boxShadow: '0 2px 5px 2px #00000026',
            transform: 'perspective(1px) scale(1.01)',
        },

        '&:active': {
            boxShadow: '0 2px 2px #00000026',
            transform: 'perspective(1px) scale(.99)',
        },

        '&:hover::after': {
            backgroundColor: '#FFF',
            opacity: 0.2,
            transition: 'all .2s'
        },

        '&:active::after': {
            backgroundColor: '#000',
            opacity: 0.2,
            transition: 'all .2s'
        },

        '& , &::after': {
            borderRadius: '10px',
            border: 'none'
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0, right: 0,
            top: 0, bottom: 0,
            background: '#d3d3d3bf',

            transition: 'opacity .2s',
            opacity: 0
        }
    },
    buttonText: {
        color: (props: UniqueProps) => props.textColor || props.determineTextColor(props.backgroundColor)
    },
    disabled: {
        pointerEvents: 'none',

        '&::after': {
            opacity: 1
        }
    }
})

export const DefaultButton: FunctionComponent<UniqueProps> = (props) => {
    const classes = useStyles(props);

    return (
        <button className={styles.generalButton + ' ' + classes.defaultButton + (props.disabled ? ' ' + classes.disabled : '')}
                onClick={props.onClick}>
            <p className={classes.buttonText}>{props.text}</p>
        </button>
    )
}

DefaultButton.defaultProps = {

}
