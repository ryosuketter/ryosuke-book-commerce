"use client";

import React, {useEffect} from "react";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

const PurchaseSuccess = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // useSearchParamsを使う場合はクライアントコンポーネント内でのみ使用可能なので use client を追加
  // クライアントでフェッチするので useEffect を使う
  // Next.js 13以降になってSSRを使う場合はgetServerSidePropsを使うことが推奨されているが変わった
  // そもそも POSTメソッドはgetServerSidePropsでは使えないので、useEffectの中でクライアントサイドで非同期処理を行う
  useEffect(() => {
    // useEffectの中で非同期処理（async/await）を行うには関数を作る必要がある
    const fetchData = async () => {
      if (sessionId) {
        try {
          console.log("sessionId", sessionId);

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/success`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({sessionId}),
          });
          console.log(await res.json());
        } catch (error) {
          console.log("error", error);
          console.error(error);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          購入ありがとうございます！
        </h1>
        <p className="text-center text-gray-600">
          ご購入いただいた内容の詳細は、登録されたメールアドレスに送信されます。
        </p>
        <div className="mt-6 text-center">
          <Link
            href={`/`}
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            購入した記事を読む
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
