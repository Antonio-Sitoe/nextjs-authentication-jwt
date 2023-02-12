import Head from "next/head";
import styles from "./Home.module.scss";

import { SubscribeButton } from "../components/SubscribeButton";
import { GetStaticProps } from "next";
import { stripe } from "../services/Stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}
// Conteudo o mesmo para todas as pessoas.
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(process.env.PRODUCT_API_ID); // ID DO PRODUCTO QUE VOCE CADASTROU LA NO DASBOARD DO STRIPE
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("pt-MZ", {
      currency: "MZN",
    }).format(price.unit_amount / 100),
  };
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours ou 1 dia
  };
};

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home |Ignews</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏, Seja bem vindo</span>
          <h1>
            Novidades Sobre o universo do <span>React.Js </span>
          </h1>
          <p>
            Saiba mais sobre o ecossistema Javascript <br />
            <span>por apenas {product.amount} MZN por mes</span>
          </p>
          {/* <SubscribeButton /> */}
        </section>
        <img src="/avatar.svg" alt="girl coding" />
      </main>
    </>
  );
}
