import Form from "../forms/Form";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { CustomStylesEnum } from "../../models/styles";

interface Props {
  setEditPassword: (value: React.SetStateAction<boolean>) => void;
}

// validation does not occur until Save button is clicked
// first check is for matching password / confirm password fields
// this check is done front end only
// second check is for correct password features (min length, etc)
// this check is done backend, with an error returned for failure
// third check is for current password against db password

const EditPasswordForm = ({ setEditPassword }: Props) => {
  return (
    <>
      <span className="text-lg font-medium mr-4">Change Password</span>
      <p className="my-4">
        Make sure your password is at least 8 characters and contains at least 1 uppercase letter, 1
        lowercase letter, and 1 number.
      </p>
      <div>
        <Form id="change-password-form">
          {/* // TODO: change type to password */}
          <Input type="text" id="" name="" label="New Password" handleChange={() => {}} />
          <Input type="text" id="" name="" label="Confirm New Password" handleChange={() => {}} />
          <Input type="text" id="" name="" label="Current Password" handleChange={() => {}} />
          <Button
            type="submit"
            text="Save"
            handleClick={() => {}}
            styles={`${CustomStylesEnum.authButton} ${CustomStylesEnum.btnPrimary}`}
          />
          <Button
            type="button"
            text="Cancel"
            handleClick={() => setEditPassword(false)}
            styles={CustomStylesEnum.btnCancel}
          />
        </Form>
      </div>
    </>
  );
};

export default EditPasswordForm;
