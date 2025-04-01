"use client";
import React, { useActionState } from "react";
import Form from "next/form";
import { Loader2 } from "lucide-react";

const initialState = {
  message: "",
};

type SignUpProps = {
  action: (
    prevState: unknown,
    formData: FormData
  ) => Promise<{ message?: string } | undefined>;
};

export default function SignUp({ action }: SignUpProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <Form
      action={formAction}
      className="max-w-lg mx-auto my-16 p-8 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 rounded-xl shadow-2xl"
    >
      <h1 className="text-3xl font-extrabold text-center text-white mb-6">
        Join the Deal Revolution!
      </h1>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
            placeholder="Create a password"
          />
        </div>

        <div className="text-center">
          <p className="text-xs text-white mb-2">
            ⚡️ Only 127 welcome bonus packages remaining!
          </p>
          <p className="text-xs text-white mb-4">🕒 Offer expires in: 13:45</p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-rose-600 hover:bg-rose-700 text-white"
          }`}
        >
          {isPending ? (
            <React.Fragment>
              <Loader2 className="w-4 h-4 animate-spin" />
              CREATING ACCOUNT
            </React.Fragment>
          ) : (
            "CREATE ACCOUNT"
          )}
        </button>

        {state?.message && state.message.length > 0 && (
          <p className="text-center text-sm text-red-600 mt-4">
            {state.message}
          </p>
        )}
      </div>
    </Form>
  );
}
