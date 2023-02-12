import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, useSession, signOut } from "next-auth/client";
import styles from "./styles.module.scss";

export function SignInButton() {
  const [data] = useSession();

  if (data)
    return (
      <button className={styles.signInButton} onClick={() => signOut()}>
        <FaGithub color="#04d361" />
        {data.user.name}
        <FiX color="#737380" className={styles.closeIcon} />
      </button>
    );
  else
    return (
      <button onClick={() => signIn("github")} className={styles.signInButton}>
        <FaGithub color="#eba417" />
        Sign In with GitHub
      </button>
    );
}
