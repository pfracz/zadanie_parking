import { forwardRef } from "react";
import { Input } from "reactstrap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormInput = forwardRef(({ onChange, onClick, disabled, ...props }: any, ref: any) => {
    return <Input innerRef={ref} onChange={onChange} onClick={onClick} disabled={disabled} {...props} />;
});

export default FormInput;
