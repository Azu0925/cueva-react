import React,{useState,useEffect, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {push} from "connected-react-router";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {InputText,CompleteButton,ErrorMessage} from '../component/UIKit'
import {signUp} from '../reducks/user/operations'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root:{
        width:'60%',
        padding:'2rem',
        margin: '2rem auto',
    },
    title:{
        marginLeft:'3rem',
        fontSize:'2rem'
    },
    formGroup:{
        paddingTop:'1rem',
        width:'60%',
        margin:'0 auto'
    },
    anotherLink:{
        marginLeft: '80%'
    }
})

const SignUp = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [againPassword,setAgainPassword] = useState('')

    const [nameErr,setNameErr] = useState(true)
    const [emailErr,setEmailErr] = useState(true)
    const [passwordErr,setPasswordErr] = useState(true)

    const inputName = useCallback((e) => {
        setName(e.target.value)
    },[setName])
    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[setEmail])
    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    },[setPassword])
    const inputAgainPassword = useCallback((e) => {
        setAgainPassword(e.target.value)
    },[setAgainPassword])

    const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

    const handleBlurOfName = (e) => {
        const name = e.target.value

        if(name === "" || !name){
            setNameErr('ユーザー名を入力してください')
        }else if(name.length > 30){
            setNameErr('ユーザー名は30文字以内で入力してください')
        }
        else setNameErr()
    }

    const handleBlurOfEmail = (e) => {
        const email = e.target.value

        if(email === "" || !email){
            setEmailErr('メールアドレスを入力してください')
        }else if(!reg.test(email)){
            setEmailErr('正しい表記で入力してください')
        }else setEmailErr()
    }

    const handleBlurOfPassWord = (pass) => {
        const password = pass

        if(password === "" || !password){
            setPasswordErr('パスワードを入力してください')
        }else if(password.length < 8){
            setPasswordErr('パスワードは8桁以上で設定してください')
        }else if(password.length > 30){
            setPasswordErr('パスワードは30桁以内で入力してください')
        }else if(password !== againPassword){
            setPasswordErr('確認用入力欄のパスワードと一致しません')
        }else setPasswordErr()
    }
    const isDisabled = (nameErr || emailErr || passwordErr) ? true : false
    return(
        <div id="authMain">
            <Paper elevation={7} className={classes.root}>
                <h1 className={classes.title}>会員登録</h1>

                <div className={classes.formGroup}>
                    <InputText
                        fullWidth={true}
                        label={"ユーザー名を入力してください"}
                        multiline={false}
                        required={true}
                        rows={1}
                        type={"text"}
                        value={name}
                        onChange={(e) => inputName(e)}
                        onBlur={(e) => handleBlurOfName(e)}
                    />
                    <ErrorMessage msg={nameErr} />
                    <div className={"spacer--medium"} />

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
                        onBlur={(e) => handleBlurOfPassWord(e.target.value)}
                    />
                    <ErrorMessage msg={passwordErr} />
                    <div className={"spacer--medium"} />

                    <InputText
                        fullWidth={true}
                        label={"もう一度パスワードを入力してください"}
                        multiline={false}
                        required={true}
                        rows={1}
                        type={"password"}
                        value={againPassword}
                        onChange={(e) => inputAgainPassword(e)}
                        onBlur={() => handleBlurOfPassWord(password)}
                    />
                    <div className={"spacer--medium"} />

                    <CompleteButton
                        label={'登録する'}
                        color={'primary'}
                        variant={'outlined'}
                        disabled={isDisabled}
                        onClick={() => dispatch(signUp(name,email,password))}
                    />
                </div>
                <Button color="primary"
                    className={classes.anotherLink}
                    onClick={() => dispatch(push('/signin'))}
                >
                    ログインはこちら
                </Button>
            </Paper>
        </div>
    )

}
export default SignUp