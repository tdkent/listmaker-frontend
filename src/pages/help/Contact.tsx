import { Form, redirect, useActionData } from "react-router-dom";

interface ActionData {
  error?: string;
}

const Contact = () => {
  const data = useActionData();
  const actionData: ActionData = data as ActionData;
  console.log("actionData: ", actionData);
  return (
    <div>
      <h2>Contact</h2>
      <Form method="post" action="/help/contact">
        <div>
          <label>
            <span>Your email:</span>
            <input type="email" name="email" required />
          </label>
        </div>
        <div>
          {actionData && actionData.error && <p>{actionData.error}</p>}
          <label>
            <span>Your message:</span>
            <textarea name="message" required></textarea>
          </label>
        </div>
        <button>Submit</button>
      </Form>
    </div>
  );
};

export default Contact;

export const contactAction = async ({ request }: any) => {
  console.log("request: ", request);
  const data = await request.formData();
  const submission = {
    email: data.get("email"),
    message: data.get("message"),
  };
  console.log(submission);
  // form validation using useActionData hook
  if (submission.message.length <= 10) {
    return { error: "Message must be 10 or more characters long." };
  }
  // send post request to actual API here, using the submission object data.

  // redirect user
  return redirect("/");
};
