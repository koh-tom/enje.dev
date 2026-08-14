"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { type ContactState, submitContact } from "@/lib/actions/contact";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.status === "sent") {
    return (
      <div className="frame p-6" role="status">
        <p className="font-display text-3xl">送信しました。</p>
        <p className="text-ink-soft">
          ありがとうございます。返信が必要なものには数日以内にお返事します。
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      {state.status === "error" && state.message && (
        <p role="alert" className="frame p-3 font-bold">
          ! {state.message}
        </p>
      )}

      <Field label="お名前" name="name" error={errors.name}>
        <Input
          id="name"
          name="name"
          required
          maxLength={50}
          autoComplete="name"
          defaultValue={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
      </Field>

      <Field
        label="メールアドレス"
        name="email"
        error={errors.email}
        hint="返信先になります"
      >
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : "email-hint"}
        />
      </Field>

      <Field label="件名" name="subject" error={errors.subject}>
        <Input
          id="subject"
          name="subject"
          required
          maxLength={100}
          defaultValue={values.subject}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
      </Field>

      <Field
        label="本文"
        name="message"
        error={errors.message}
        hint="2000 文字まで"
      >
        <Textarea
          id="message"
          name="message"
          required
          maxLength={2000}
          defaultValue={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
        />
      </Field>

      {/* honeypot: 人間には見えない。bot が埋めたら捨てる */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        variant="solid"
        disabled={pending}
        className="self-start"
      >
        {pending ? "送信中…" : "送信する"}
      </Button>
    </form>
  );
}
