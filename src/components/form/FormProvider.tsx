import { FormProvider as RHFormProvider } from "react-hook-form";

interface Props {
  children: React.ReactNode;
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
