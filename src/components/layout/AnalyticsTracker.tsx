"use client";

import { useCartStore } from "@/stores/card-store";
import { User } from "@prisma/client";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

type AnalyticsTrackerProps = {
  user: Partial<User> | null;
};
export default function AnalyticsTracker({ user }: AnalyticsTrackerProps) {
  const { cartId } = useCartStore(
    useShallow((state) => ({
      cartId: state.cartId,
    }))
  );
  useEffect(() => {
    if (!cartId || user) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyWindow = window as any;

      if (anyWindow.umami) {
        anyWindow.umami.identity({
          cartId,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [cartId]);

  useEffect(() => {
    if (!user) {
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyWindow = window as any;

      if (anyWindow.umami) {
        anyWindow.umami.identify({
          email: user.email,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  return <div></div>;
}
