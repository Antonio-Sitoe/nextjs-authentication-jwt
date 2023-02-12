import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { fauna } from "../../services/Fauna";
import { stripe } from "../../services/Stripe";
import { query as q } from "faunadb";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user } = await getSession({ req });
    const userByEmail = await fauna.query<User>(
      q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
    );

    let customerId = userByEmail.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
      });

      await fauna.query(
        q.Update(q.Ref(q.Collection("users"), userByEmail.ref.id), {
          data: {
            stripe_customer_id: stripeCustomer.id,
          },
        })
      );
      customerId = stripeCustomer.id;
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId, // id do customer no stripe
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price: "price_1MVCGsDmj24o9o1kHwBkQv7p",
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    return res.status(200).json({
      sessionId: checkoutSession.id,
    });
  } else {
    res.send("Allow POST");
    res.status(405).end("Metodo nao permitido");
  }
}
