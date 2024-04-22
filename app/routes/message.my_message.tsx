import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { encryptPassword } from "./new.message";
import { Form, useLoaderData } from '@remix-run/react'

export async function loader({ request }: LoaderFunctionArgs) {
  const formData = request.formData();

  // todo: error boundary
  // todo: if formData doesn't exist


  if (formData) {
    const passwordInput = (await formData).get("password");
    if (passwordInput !== null) {
      const encryptedPassword = encryptPassword(passwordInput as string);
      
  // todo: if password matchs, return theNote.message
      const theNote = db.note
        .findFirst({
          where: {
            password: encryptedPassword,
          },
        })
        .then((theNote) => {
          return theNote?.message;
        });
      return null;
    }
  }
}


export default function MyMessage() {
  // todo: check if password exists in db, then get the message
  // useLoaderData()



  return (
    <main>
      <Form method="GET">
        <input type="password" name="password" />
        <button type="submit">Get my secret message!</button>
      </Form>
    </main>
  );
}
