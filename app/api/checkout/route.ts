import Stripe from "stripe";
import {NextResponse} from "next/server";
// 初期化（環境変数を設置）
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// console.log("baseUrl", baseUrl);

export async function POST(request: Request, response: Response) {
  const {title, price, bookId, userId} = await request.json();

  try {
    // チェックアウトセッションの作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // 支払い方法
      metadata: {
        bookId: bookId,
      },
      client_reference_id: userId,
      // 決済する内容
      line_items: [
        {
          price_data: {
            currency: "jpy", // 通貨
            product_data: {
              // 商品情報
              name: title,
            },
            unit_amount: price, // 金額
          },
          quantity: 1, // 数量
        },
      ],
      mode: "payment", // 支払いモード
      success_url: `http://localhost:3000/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`, // 支払い成功時のリダイレクトURL。{CHECKOUT_SESSION_ID}はStripeが自動で置換
      cancel_url: `http://localhost:3000/`, // 支払いキャンセル時のリダイレクトURL
    });
    return NextResponse.json({checkout_url: session.url});
  } catch (err: any) {
    return NextResponse.json({message: err.message});
  }
}
