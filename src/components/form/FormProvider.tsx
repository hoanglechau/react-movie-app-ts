import { ReactNode } from "react";
import { FormProvider as RHFormProvider } from "react-hook-form";

interface Props {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  methods: any;
}

function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <RHFormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </RHFormProvider>
  );
}

export default FormProvider;
