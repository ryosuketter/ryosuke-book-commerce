import prisma from "@/app/lib/prisma";
import Stripe from "stripe";
import {NextResponse} from "next/server";

// 初期化（環境変数を設置）
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
console.log("stripe", stripe);

// 購入履歴の保存
export async function POST(request: Request, response: Response) {
  const {sessionId} = await request.json();
  console.log("sss");
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("session", session);

    // 購入履歴保存の重複を防ぐ
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId!,
      },
    });
    if (!existingPurchase) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId!,
        },
      });
      return NextResponse.json({purchase});
    } else {
      return NextResponse.json({message: "購入履歴が既に存在します"});
    }
  } catch (error: any) {
    return NextResponse.json({message: error.message});
  }
}
