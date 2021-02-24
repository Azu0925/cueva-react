import React,{useState,useEffect, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {push} from "connected-react-router";
import {signIn} from '../reducks/user/operations'
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {InputText,CompleteButton,ErrorMessage} from '../component/UIKit'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        width:'40%',
        height:'70%',
        padding:'2rem',
        margin: '2rem auto',
    },
    title:{
        marginLeft:'3rem',
        fontSize:'2rem'
    },
    formGroup:{
        paddingTop:'3rem',
        width:'60%',
        margin:'0 auto'
    },
    anotherLink:{
        marginLeft: '70%'
    }
})

const SignIn = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [emailErr,setEmailErr] = useState(true)
    const [passwordErr,setPasswordErr] = useState(true)

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[setEmail])
    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    },[setPassword])

    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;


    const handleBlurOfEmail = (e) => {
        const email = e.target.value

        if(email === "" || !email){
            setEmailErr('メールアドレスを入力してください')
        }else if(!reg.test(email)){
            setEmailErr('正しい表記で入力してください')
        }else setEmailErr()
    }

    const handleBlurOfPassWord = (e) => {
        const password = e.target.value

        if(password === "" || !password){
            setPasswordErr('パスワードを入力してください')
        }else if(password.length < 8){
            setPasswordErr('パスワードは8桁以上で入力してください')
        }else if(password.length > 30){
            setPasswordErr('パスワードは30桁以内で入力してください')
        }else setPasswordErr()
    }
    const isDisabled = (emailErr || passwordErr) ? true : false
    return(
        <div id="authMain">
            <Paper elevation={7} className={classes.root} onSelectStart={() => {return false}}>
                <h1 className={classes.title}>ログイン</h1>
                <div className={classes.formGroup}>
                    <InputText
                        fullWidth={true}
                        label={"メールアドレスを入力してください"}
                        multiline={false}
                        required={true}
                        rows={1}
                        type={"text"}
                        value={email}
                        onChange={(e) => inputEmail(e)}
                        onBlur={(e) => handleBlurOfEmail(e)}
                    />
                    <ErrorMessage msg={emailErr} />
                    <div className={"spacer--medium"} />

                    <InputText
                        fullWidth={true}
                        label={"パスワードを入力してください"}
                        multiline={false}
                        required={true}
                        rows={1}
                        type={"password"}
                        value={password}
                        onChange={(e) => inputPassword(e)}
                        onBlur={(e) => handleBlurOfPassWord(e)}
                    />
                    <ErrorMessage msg={passwordErr} />
                    <div className={"spacer--medium"} />

                    <CompleteButton
                        label={'ログイン'}
                        color={'primary'}
                        variant={'outlined'}
                        disabled={isDisabled}
                        onClick={() => dispatch(signIn(email.password))}
                    />
                </div>
                <Button color="primary"
                    className={classes.anotherLink}
                    onClick={() => dispatch(push('/signup'))}
                >
                    会員登録はこちら
                </Button>
            </Paper>
        </div>
    )

}
export default SignIn