import CryptoJS from "crypto-js";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { SyntheticEvent } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const message = formData.get("message") as string;
  const password = formData.get("password") as string;
  try {
    const encryptedPassword = encryptPassword(password);
    const data = await db.note.create({
      data: {
        message,
        password: encryptedPassword,
      },
    });
    return json({ data });
  } catch (error) {
    console.error("Oops!", error);
    return json({ error: "Encrypting password failed." }, { status: 500 });
  }
}

export const encryptPassword = (password: string): string => {
  const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  return hash;
};

export default function NewMessage() {
  const submit = useSubmit();
  const submitHandler = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (isCreateMessageConfirmed()) {
      submit(form, {
        method: "POST",
      });
      form.reset();
    } else {
      form.reset();
      return;
    }
  };

  const isCreateMessageConfirmed = (): boolean => {
    return window.confirm("Are you sure you want to create this message?");
  };

  return (
    <main>
      <Form method="POST" onSubmit={submitHandler}>
        <textarea name="message"></textarea>
        <input type="password" name="password" />
        <button type="submit">CREATE</button>
      </Form>
    </main>
  );
}
