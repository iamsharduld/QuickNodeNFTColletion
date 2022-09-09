import Link from 'next/link'
import useStoreAuth from '../store'
import styles from '../styles/login.module.css'
import Button from '@mui/material/Button';

export default function LoginComp() {
    const signIn = useStoreAuth((state) => state.signIn)

    return (
    <main className={styles.main}>
        <h1 className={styles.title}>
        Click to view Trending Colletions
        </h1>

        <Link href="/view-trending"><Button variant="contained" className={styles.login_button} onClick={signIn}>Login</Button></Link>
    </main>
    )
}